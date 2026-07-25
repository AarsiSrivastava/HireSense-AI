
from pydantic import BaseModel
from datetime import datetime


class AnalysisCreate(BaseModel):
    user_id: int
    resume_name: str
    ats_score: int
    recruiter_verdict: str


class AnalysisResponse(BaseModel):
    id: int
    user_id: int
    resume_name: str
    ats_score: int
    recruiter_verdict: str
    created_at: datetime

    class Config:
        from_attributes = True