
import fitz
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

    pdf = fitz.open(pdf_path)

    for page in pdf:
        text += page.get_text()

    pdf.close()

    # Clean invisible characters inserted by many PDF resume builders
    text = (
        text.replace("\u200b", "")
            .replace("\xa0", " ")
            .replace("\uf0b7", "•")
    )

    return text



# -----------------------------------
# Extract Name
# -----------------------------------


def extract_name(text):

    lines = [line.strip() for line in text.split("\n") if line.strip()]

    print("\n===== FIRST 15 LINES OF RESUME =====")
    for i, line in enumerate(lines[:15]):
        print(f"{i}: {repr(line)}")
    print("====================================\n")

    ignore_words = [
        "india",
        "linkedin",
        "github",
        "leetcode",
        "portfolio",
        "education",
        "email",
        "phone",
        "@",
        "http",
        "www",
    ]

    for line in lines[:8]:

        lower = line.lower()

        # Ignore unwanted lines
        if any(word in lower for word in ignore_words):
            continue

        # Ignore phone numbers
        if extract_phone(line):
            continue

        # Remove punctuation except spaces
        cleaned = re.sub(r"[^A-Za-z ]", "", line).strip()

        words = cleaned.split()

        # Candidate should be 2-4 alphabetic words
        if (
            2 <= len(words) <= 4
            and all(word.isalpha() for word in words)
        ):
            return " ".join(word.capitalize() for word in words)

    # Fallback to spaCy
    doc = nlp(text)

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            if 2 <= len(ent.text.split()) <= 4:
                return ent.text

    return "Unknown"


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
# Extract Projects
# -----------------------------------

def extract_projects(text):

    projects = []

    keywords = [
        "project",
        "developed",
        "built",
        "created",
        "designed"
    ]

    for line in text.split("\n"):

        line = line.strip()

        for keyword in keywords:
            if keyword in line.lower():
                if line not in projects:
                    projects.append(line)

    return projects


# -----------------------------------
# Extract Certifications
# -----------------------------------

def extract_certifications(text):

    certifications = []

    keywords = [
        "certificate",
        "certification",
        "certified",
        "nptel",
        "coursera",
        "udemy",
        "aws",
        "google",
        "ibm",
        "microsoft"
    ]

    for line in text.split("\n"):

        line = line.strip()

        for keyword in keywords:
            if keyword in line.lower():
                if line not in certifications:
                    certifications.append(line)

    return certifications


# -----------------------------------
# Extract Links
# -----------------------------------

def extract_links(text):

    links = re.findall(
        r"https?://[^\s]+",
        text
    )

    return links


# -----------------------------------
# Extract Languages
# -----------------------------------

def extract_languages(text):

    language_db = [
        "english",
        "hindi",
        "french",
        "german",
        "spanish",
        "japanese",
        "chinese"
    ]

    found = []

    text = text.lower()

    for language in language_db:
        if language in text:
            found.append(language.title())

    return found

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
        "experience": extract_experience(text),
        "projects": extract_projects(text),
        "certifications": extract_certifications(text),
        "links": extract_links(text),
        "languages": extract_languages(text)
    }

    return data