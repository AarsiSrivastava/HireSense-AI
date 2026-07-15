from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.resume import router

app = FastAPI(
    title="HireSense AI API",
    description="AI-powered Resume ATS Analyzer",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "Welcome to HireSense AI 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "message": "Backend is running successfully!"
    }