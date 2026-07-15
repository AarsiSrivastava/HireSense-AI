import pdfplumber
import re
import spacy

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")

# -----------------------------------
# List of common technical skills
# -----------------------------------

SKILLS_DB = [
    "python", "java", "c", "c++", "javascript", "typescript",
    "html", "css", "react", "node.js", "express", "fastapi",
    "django", "flask", "mongodb", "mysql", "postgresql", "sql",
    "git", "github", "docker", "aws", "azure", "tensorflow",
    "pytorch", "machine learning", "deep learning", "nlp",
    "data science", "pandas", "numpy", "opencv",
    "tailwind", "bootstrap", "figma", "rest api"
]

# -----------------------------------
# Extract text from PDF
# -----------------------------------

def extract_text(pdf_path):
    text = ""

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text


# -----------------------------------
# Extract Name
# -----------------------------------

def extract_name(text):
    doc = nlp(text)

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text

    return None


# -----------------------------------
# Extract Email
# -----------------------------------

def extract_email(text):
    emails = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    return emails[0] if emails else None


# -----------------------------------
# Extract Phone Number
# -----------------------------------

def extract_phone(text):
    phones = re.findall(
        r"(?:\+91[-\s]?)?[6-9]\d{9}",
        text
    )

    return phones[0] if phones else None


# -----------------------------------
# Extract Skills
# -----------------------------------

def extract_skills(text):
    text = text.lower()

    found_skills = []

    for skill in SKILLS_DB:
        if skill.lower() in text:
            found_skills.append(skill)

    return sorted(list(set(found_skills)))


# -----------------------------------
# Extract Education
# -----------------------------------

def extract_education(text):

    education_keywords = [
        "b.tech",
        "btech",
        "bachelor",
        "m.tech",
        "mtech",
        "master",
        "phd",
        "high school",
        "intermediate",
        "ssc",
        "hsc"
    ]

    education = []

    for line in text.split("\n"):

        for keyword in education_keywords:

            if keyword.lower() in line.lower():
                education.append(line.strip())

    return education


# -----------------------------------
# Extract Experience
# -----------------------------------

def extract_experience(text):

    experience = []

    keywords = [
        "experience",
        "intern",
        "internship",
        "software engineer",
        "developer",
        "project"
    ]

    for line in text.split("\n"):

        for keyword in keywords:

            if keyword.lower() in line.lower():
                experience.append(line.strip())

    return experience


# -----------------------------------
# Main Function
# -----------------------------------

def parse_resume(pdf_path):

    text = extract_text(pdf_path)

    data = {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience": extract_experience(text)
    }

    return data