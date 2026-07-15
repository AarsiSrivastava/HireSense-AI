
from app.services.parser import parse_resume

resume = parse_resume("/Users/aarsisrivastava/Desktop/Aarsi Srivastava_Resume Pdf.pdf")

print("\n========== PARSED RESUME ==========\n")

for key, value in resume.items():
    print(f"{key.upper()} :")
    print(value)
    print()