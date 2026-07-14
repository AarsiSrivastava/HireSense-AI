from fastapi import FastAPI

app = FastAPI(
    title="HireSense AI API",
    description="AI-powered Resume ATS Analyzer",
    version="1.0.0"
)

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