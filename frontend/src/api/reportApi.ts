import axios from "axios";

const API_URL = "https://hiresense-ai-yjuo.onrender.com";

export const downloadPDF = async (reportData: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/report/pdf`,
      reportData,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: "application/pdf",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "HireSense_AI_Report.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("PDF generation failed:", error);
    alert("Unable to generate PDF report.");
  }
};