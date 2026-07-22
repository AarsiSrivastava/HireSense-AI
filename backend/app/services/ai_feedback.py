
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_feedback(resume_text, jd_text):
    prompt = f"""
You are an expert ATS recruiter.

Resume:
{resume_text}

Job Description:
{jd_text}

Provide:

1. Overall feedback
2. Strengths
3. Missing skills
4. Resume improvements
5. Final recruiter verdict

Return concise bullet points.
"""

    try:
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response.choices[0].message.content

    except Exception:
        return "AI feedback unavailable."