
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.database import Base


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    resume_name = Column(String, nullable=False)

    ats_score = Column(Integer)

    recruiter_verdict = Column(String)

    created_at = Column(DateTime(timezone=True), server_default=func.now())