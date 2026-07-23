
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
)
from io import BytesIO
from datetime import datetime

router = APIRouter(prefix="/report", tags=["Report"])


@router.post("/pdf")
async def generate_pdf(data: dict):
    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(Paragraph("<b>HireSense-AI ATS Report</b>", styles["Title"]))
    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(
            f"Generated: {datetime.now().strftime('%d %B %Y %H:%M')}",
            styles["Normal"],
        )
    )

    elements.append(Spacer(1, 20))

    elements.append(
        Paragraph(f"<b>Candidate:</b> {data.get('name','Unknown')}", styles["Normal"])
    )

    elements.append(
        Paragraph(f"<b>ATS Score:</b> {data.get('ats_score',0)}%", styles["Normal"])
    )

    elements.append(
        Paragraph(
            f"<b>Recruiter Verdict:</b> {data.get('verdict','-')}",
            styles["Normal"],
        )
    )

    elements.append(Spacer(1, 15))

    elements.append(Paragraph("<b>Summary</b>", styles["Heading2"]))
    elements.append(
        Paragraph(data.get("summary", "No summary available"), styles["BodyText"])
    )

    elements.append(Spacer(1, 15))

    elements.append(Paragraph("<b>Strengths</b>", styles["Heading2"]))
    for item in data.get("strengths", []):
        elements.append(Paragraph(f"• {item}", styles["BodyText"]))

    elements.append(Spacer(1, 15))

    elements.append(Paragraph("<b>Weaknesses</b>", styles["Heading2"]))
    for item in data.get("weaknesses", []):
        elements.append(Paragraph(f"• {item}", styles["BodyText"]))

    elements.append(Spacer(1, 15))

    elements.append(Paragraph("<b>Missing Skills</b>", styles["Heading2"]))
    for skill in data.get("missing_skills", []):
        elements.append(Paragraph(f"• {skill}", styles["BodyText"]))

    elements.append(Spacer(1, 15))

    elements.append(Paragraph("<b>Priority Suggestions</b>", styles["Heading2"]))
    for item in data.get("suggestions", []):
        elements.append(Paragraph(f"• {item}", styles["BodyText"]))

    doc.build(elements)

    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": "attachment; filename=HireSense_AI_Report.pdf"
        },
    )