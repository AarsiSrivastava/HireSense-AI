import { useState } from "react";
import ResultCard from "../components/result/ResultCard";
import SkillBadge from "../components/result/SkillBadge";
import ATSScore from "../components/result/ATSScore";
import Navbar from "../components/layout/Navbar";
import UploadBox from "../components/ui/UploadBox";
import JDInput from "../components/ui/JDInput";
import AnalyzeButton from "../components/ui/AnalyzeButton";

import api from "../api/resumeApi";

function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState("");

  const analyzeResume = async () => {
    if (!selectedFile) {
      alert("Please select a resume.");
      return;
    }

    

    setLoading(true);

    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("job_description", jobDescription);

    try {
      const response = await api.post("/upload", formData);

      console.log(response.data);

      setResumeData(response.data);
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center gap-8 px-4 py-10">

        <UploadBox onFileSelect={setSelectedFile} />

        <JDInput
          value={jobDescription}
          onChange={setJobDescription}
        />

        <AnalyzeButton
          onClick={analyzeResume}
          loading={loading}
        />

        {resumeData && (
  <div className="w-full max-w-5xl space-y-6">

    <ResultCard title="Resume Information">
      <p><strong>Name:</strong> {resumeData.name}</p>
      <p><strong>Email:</strong> {resumeData.email}</p>
      <p><strong>Phone:</strong> {resumeData.phone}</p>
    </ResultCard>

    {resumeData.analysis_type === "resume" ? (
      <>
        <ResultCard title="Resume Quality Score">
          <ATSScore score={resumeData.resume_score} />
        </ResultCard>

        <ResultCard title="Suggestions">
          <ul className="list-disc ml-6">
            {resumeData.suggestions?.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </ResultCard>
      </>
    ) : (
      <>
        <ResultCard title="ATS Score">
          <ATSScore score={resumeData.ats_score} />
        </ResultCard>

        <ResultCard title="Matched Skills">
          <div className="flex flex-wrap gap-3">
            {resumeData.matched_skills?.map(
              (skill: string, index: number) => (
                <SkillBadge
                  key={index}
                  skill={skill}
                  color="green"
                />
              )
            )}
          </div>
        </ResultCard>

        <ResultCard title="Missing Skills">
          <div className="flex flex-wrap gap-3">
            {resumeData.missing_skills?.map(
              (skill: string, index: number) => (
                <SkillBadge
                  key={index}
                  skill={skill}
                  color="red"
                />
              )
            )}
          </div>
        </ResultCard>

        <ResultCard title="Suggestions">
          <ul className="list-disc ml-6">
            {resumeData.suggestions?.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </ResultCard>
      </>
    )}

  </div>
)}
      </main>
    </>
  );
}

export default Upload;