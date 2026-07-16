from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form
from app.services.parser import parse_resume
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "app/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: Optional[str] = Form(None)
):

    # Save uploaded file
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Parse resume
    result = parse_resume(file_path)

    # Make job description optional
    job_description = (job_description or "").lower()

    resume_skills = [
        skill.lower()
        for skill in result.get("skills", [])
    ]

    # ==================================================
    # Resume Analysis Only
    # ==================================================
    if job_description.strip() == "":

        result["analysis_type"] = "resume"

        score = 40

        if result.get("name"):
            score += 10

        if result.get("email"):
            score += 10

        if result.get("phone"):
            score += 10

        score += min(len(resume_skills) * 3, 20)
        score += min(len(result.get("education", [])) * 5, 5)
        score += min(len(result.get("experience", [])) * 5, 5)

        result["resume_score"] = min(score, 100)

        suggestions = []

        if len(resume_skills) < 8:
            suggestions.append(
                "Add more technical skills to strengthen your resume."
            )

        if len(result.get("experience", [])) == 0:
            suggestions.append(
                "Include internships or project experience."
            )

        if len(result.get("education", [])) == 0:
            suggestions.append(
                "Add your education details."
            )

        result["suggestions"] = suggestions

        return result

    # ==================================================
    # ATS Analysis
    # ==================================================

    result["analysis_type"] = "ats"

    matched_skills = []
    missing_skills = []

    common_keywords = [
        "python",
        "java",
        "sql",
        "react",
        "docker",
        "aws",
        "git",
        "html",
        "css",
        "javascript",
        "mongodb",
        "fastapi",
        "django"
    ]

    for skill in resume_skills:
        if skill in job_description:
            matched_skills.append(skill)

    for keyword in common_keywords:
        if keyword in job_description and keyword not in resume_skills:
            missing_skills.append(keyword)

    ats_score = int(
        (len(matched_skills) / len(common_keywords)) * 100
    )

    suggestions = []

    for skill in missing_skills:
        suggestions.append(
            f"Consider adding experience with {skill.title()}."
        )

    result["ats_score"] = ats_score
    result["matched_skills"] = matched_skills
    result["missing_skills"] = missing_skills
    result["suggestions"] = suggestions

    return result