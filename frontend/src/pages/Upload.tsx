import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import UploadBox from "../components/ui/UploadBox";
import JDInput from "../components/ui/JDInput";
import AnalyzeButton from "../components/ui/AnalyzeButton";

import api from "../api/resumeApi";

function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeText, setResumeText] = useState("");

  const analyzeResume = async () => {
    if (!selectedFile) {
      alert("Please select a resume.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResumeText(response.data.text);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center gap-8 px-4 py-10">
        <UploadBox onFileSelect={setSelectedFile} />

        <JDInput />

        <AnalyzeButton
          onClick={analyzeResume}
          loading={loading}
        />

        {resumeText && (
          <div className="w-full max-w-4xl rounded-xl border p-6 shadow">
            <h2 className="text-2xl font-bold mb-4">
              Extracted Resume Text
            </h2>

            <pre className="whitespace-pre-wrap text-sm">
              {resumeText}
            </pre>
          </div>
        )}
      </main>
    </>
  );
}

export default Upload