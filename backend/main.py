import os
import io
import uuid
import torch
import librosa
import numpy as np
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from supabase import create_client, Client
from dotenv import load_dotenv

# .envの読み込み
load_dotenv()

# --- 1. 初期設定 ---
app = FastAPI()

# Next.jsからのアクセスを許可(CORS設定)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # 開発環境のURL
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabaseクライアントの初期化
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# --- 2. 解析エンジンの定義 ---
class VoiceTypeEngine:
    def __init__(self):
        # torchを使用したデバイス判定
        self.device = 0 if torch.cuda.is_available() else -1
        print(f"Using device: {'GPU' if self.device == 0 else 'CPU'}")
        
        # 感情分析AIモデルのロード
        self.emotion_classifier = pipeline(
            "audio-classification", 
            model="ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition",
            device=self.device
        )

    def analyze(self, file_path):
        y, sr = librosa.load(file_path)
        duration = librosa.get_duration(y=y, sr=sr)

        # ① 正規化ピッチ解析 (T vs F)
        f0, _, _ = librosa.pyin(y, fmin=librosa.note_to_hz('C2'), fmax=librosa.note_to_hz('C7'))
        f0_clean = f0[~np.isnan(f0)]
        pitch_cv = np.std(f0_clean) / np.mean(f0_clean) if len(f0_clean) > 0 else 0

        # ② 無音比率の解析 (E vs I)
        intervals = librosa.effects.split(y, top_db=25)
        speech_duration = sum([(end - start) for start, end in intervals]) / sr
        silence_ratio = (duration - speech_duration) / duration if duration > 0 else 0

        # ③ 感情分析 (P vs J, E vs I補正)
        emotions = self.emotion_classifier(file_path)
        emotion_map = {e['label']: e['score'] for e in emotions}
        excitement = emotion_map.get('happy', 0) + emotion_map.get('angry', 0)
        calmness = emotion_map.get('calm', 0) + emotion_map.get('neutral', 0) + emotion_map.get('sad', 0)

        # 16タイプ判定ロジック
        res = []
        res.append("E" if silence_ratio < 0.2 and excitement > 0.4 else "I")
        spec_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
        res.append("S" if np.mean(spec_centroid) > 2500 else "N")
        res.append("T" if pitch_cv < 0.15 else "F")
        res.append("J" if calmness > 0.6 else "P")
        
        mbti_type = "".join(res)
        return mbti_type, {"pitch_cv": pitch_cv, "silence": silence_ratio, "excitement": excitement, "calmness": calmness}

# エンジンのインスタンス化
engine = VoiceTypeEngine()

# --- 3. APIエンドポイント ---



@app.post("/analyze")
async def analyze_endpoint(user_id: str, file: UploadFile = File(...)):
    # 1. 音声ファイルを一時保存
    temp_filename = f"temp_{uuid.uuid4()}.wav"
    try:
        with open(temp_filename, "wb") as buffer:
            buffer.write(await file.read())

        # 2. 解析実行
        mbti_result, metrics = engine.analyze(temp_filename)

        # 3. Supabaseに結果を保存
        # ※注: 事前にSupabase側で 'voicetype_results' テーブルを作っておく必要があります
        db_data = {
            "user_id": user_id,
            "voice_type": mbti_result,
            "pitch_fluctuation": metrics["pitch_cv"],
            "silence_ratio": metrics["silence"],
            "excitement_score": metrics["excitement"],
            "calmness_score": metrics["calmness"]
        }
        
        response = supabase.table("voicetype_results").insert(db_data).execute()

        return {
            "status": "success",
            "type": mbti_result,
            "metrics": metrics
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        # 一時ファイルの削除
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)