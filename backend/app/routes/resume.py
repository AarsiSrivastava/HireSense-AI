from typing import Optional
from app.dependencies.auth import get_current_user
from app.models.user import User
from fastapi import Depends
from fastapi import APIRouter, UploadFile, File, Form
from app.services.parser import parse_resume
from app.services.ai_feedback import generate_feedback
import shutil
import os

router = APIRouter()

UPLOAD_DIR = "app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...),
    current_user: User = Depends(get_current_user),
):
    # Save uploaded file
    file_path = os.path.join(UPLOAD_DIR, resume.filename)

    with open(file_path, "wb") as buffer:
       shutil.copyfileobj(resume.file, buffer)


    # Parse Resume
    result = parse_resume(file_path)
    resume_text = ""

    resume_text += result.get("name", "") + "\n"
    resume_text += result.get("email", "") + "\n"
    resume_text += result.get("phone", "") + "\n"

    resume_text += "\n".join(result.get("skills", []))
    resume_text += "\n".join(result.get("education", []))
    resume_text += "\n".join(result.get("experience", []))
    resume_text += "\n".join(result.get("projects", []))  
    resume_text += "\n".join(result.get("certifications", []))

    # Job Description
    job_description = (job_description or "").lower()
    feedback = generate_feedback(resume_text, job_description)
    resume_skills = [
        skill.lower()
        for skill in result.get("skills", [])
    ]

    # ==================================================
    # Resume Analysis
    # ==================================================

    if job_description.strip() == "":

        result["analysis_type"] = "resume"

        score = 20

        # Contact Information
        if result.get("name"):
            score += 10

        if result.get("email"):
            score += 10

        if result.get("phone"):
            score += 10

        # Skills
        score += min(len(resume_skills) * 2, 20)

        # Education
        score += min(len(result.get("education", [])) * 5, 10)

        # Experience
        score += min(len(result.get("experience", [])) * 5, 15)

        # Projects
        score += min(len(result.get("projects", [])) * 5, 15)

        # Certifications
        score += min(len(result.get("certifications", [])) * 3, 10)

        # Links
        score += min(len(result.get("links", [])) * 3, 5)

        # Languages
        score += min(len(result.get("languages", [])) * 2, 5)

        result["resume_score"] = min(score, 100)

        # Suggestions
        suggestions = []

        if len(resume_skills) < 8:
            suggestions.append(
                "Add more technical skills relevant to your target role."
            )

        if len(result.get("experience", [])) == 0:
            suggestions.append(
                "Include internships or professional experience."
            )

        if len(result.get("projects", [])) < 2:
            suggestions.append(
                "Add more academic or personal projects."
            )

        if len(result.get("certifications", [])) == 0:
            suggestions.append(
                "Include certifications to strengthen your profile."
            )

        if len(result.get("links", [])) == 0:
            suggestions.append(
                "Add GitHub or LinkedIn profile links."
            )

        if len(result.get("languages", [])) == 0:
            suggestions.append(
                "Mention the languages you know."
            )

        # Strengths
        strengths = []

        if len(resume_skills) >= 8:
            strengths.append("Strong technical skill set.")

        if len(result.get("projects", [])) >= 2:
            strengths.append("Good project portfolio.")

        if len(result.get("certifications", [])) > 0:
            strengths.append("Relevant certifications included.")

        if len(result.get("links", [])) > 0:
            strengths.append("Professional portfolio links detected.")

        if len(result.get("experience", [])) > 0:
            strengths.append("Relevant experience available.")

        # Weaknesses
        weaknesses = []

        if len(result.get("experience", [])) == 0:
            weaknesses.append("No professional experience found.")

        if len(result.get("projects", [])) < 2:
            weaknesses.append("Project section can be improved.")

        if len(result.get("certifications", [])) == 0:
            weaknesses.append("No certifications detected.")

        if len(result.get("links", [])) == 0:
            weaknesses.append("Portfolio links are missing.")

        result["suggestions"] = suggestions
        result["strengths"] = strengths
        result["weaknesses"] = weaknesses

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

    # Suggestions
    suggestions = []

    for skill in missing_skills:
        suggestions.append(
            f"Consider adding experience with {skill.title()}."
        )

    if len(result.get("experience", [])) == 0:
        suggestions.append(
            "Include internships or professional experience."
        )

    if len(result.get("projects", [])) < 2:
        suggestions.append(
            "Add more academic or personal projects."
        )

    if len(result.get("certifications", [])) == 0:
        suggestions.append(
            "Include certifications."
        )

    if len(result.get("links", [])) == 0:
        suggestions.append(
            "Add GitHub or LinkedIn links."
        )

    # Strengths
    strengths = []

    if len(matched_skills) >= 5:
        strengths.append("Strong technical skill match.")

    if len(result.get("projects", [])) >= 2:
        strengths.append("Good project portfolio.")

    if len(result.get("experience", [])) > 0:
        strengths.append("Relevant experience available.")

    if len(result.get("certifications", [])) > 0:
        strengths.append("Relevant certifications included.")

    # Weaknesses
    weaknesses = []

    if missing_skills:
        weaknesses.append(
            "Missing important skills from the job description."
        )

    if len(result.get("experience", [])) == 0:
        weaknesses.append(
            "No professional experience found."
        )

    if len(result.get("projects", [])) < 2:
        weaknesses.append(
            "Project section can be improved."
        )

    if len(result.get("certifications", [])) == 0:
        weaknesses.append(
            "No certifications detected."
        )

    # Section Analysis
    section_analysis = {
        "Education": "Excellent" if result.get("education") else "Needs Improvement",
        "Experience": "Good" if result.get("experience") else "Needs Improvement",
        "Projects": "Good" if result.get("projects") else "Needs Improvement",
        "Skills": "Excellent" if len(resume_skills) >= 8 else "Good",
        "Certifications": "Good" if result.get("certifications") else "Needs Improvement"
    }

    # Interview Chance
    interview_chance = min(ats_score + 15, 100)

    # Recommendation
    if ats_score >= 80:
        recommendation = "Excellent match for this role."
    elif ats_score >= 60:
        recommendation = "Good match. Improve a few missing skills."
    elif ats_score >= 40:
        recommendation = "Average match. Resume needs improvement."
    else:
        recommendation = "Low match. Consider tailoring your resume."

    # Final Response
    result["ats_score"] = ats_score
    result["matched_skills"] = matched_skills
    result["missing_skills"] = missing_skills
    result["suggestions"] = suggestions
    result["strengths"] = strengths
    result["weaknesses"] = weaknesses
    result["section_analysis"] = section_analysis
    result["interview_chance"] = interview_chance
    result["recommendation"] = recommendation
    result["feedback"] = feedback

    return result