import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import UploadBox from "../components/ui/UploadBox";
import JDInput from "../components/ui/JDInput";
import AnalyzeButton from "../components/ui/AnalyzeButton";

import ResultCard from "../components/result/ResultCard";
import SkillBadge from "../components/result/SkillBadge";
import ATSScore from "../components/result/ATSScore";
import InterviewChance from "../components/result/InterviewChance";
import RecommendationCard from "../components/result/RecommendationCard";
import StrengthCard from "../components/result/StrengthCard";
import WeaknessCard from "../components/result/WeaknessCard";
import SectionAnalysis from "../components/result/SectionAnalysis";

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

          <div className="w-full max-w-6xl space-y-6">

            <div className="text-center">
              <h1 className="text-4xl font-bold text-blue-700">
                HireSense AI Report
              </h1>

              <p className="text-gray-500 mt-2">
                AI Powered Resume Analysis Dashboard
              </p>
            </div>

            <ResultCard title="Resume Information">

              <div className="space-y-3">

                <p>
                  👤 <strong>Name:</strong> {resumeData.name}
                </p>

                <p>
                  📧 <strong>Email:</strong> {resumeData.email}
                </p>

                <p>
                  📱 <strong>Phone:</strong> {resumeData.phone}
                </p>

              </div>

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

                <div className="grid md:grid-cols-2 gap-6">

                  <ResultCard title="Interview Chance">
                    <InterviewChance
                      chance={resumeData.interview_chance}
                    />
                  </ResultCard>

                  <ResultCard title="AI Recommendation">
                    <RecommendationCard
                      recommendation={resumeData.recommendation}
                    />
                  </ResultCard>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <ResultCard title="Strengths">
                    <StrengthCard
                      strengths={resumeData.strengths}
                    />
                  </ResultCard>

                  <ResultCard title="Weaknesses">
                    <WeaknessCard
                      weaknesses={resumeData.weaknesses}
                    />
                  </ResultCard>

                </div>

                <ResultCard title="Section Analysis">
                  <SectionAnalysis
                    sections={resumeData.section_analysis}
                  />
                </ResultCard>

              </>
            ) : (
                            <>
                {/* ATS Score + Interview Chance */}

                <div className="grid md:grid-cols-2 gap-6">

                  <ResultCard title="ATS Score">
                    <ATSScore score={resumeData.ats_score} />
                  </ResultCard>

                  <ResultCard title="Interview Chance">
                    <InterviewChance
                      chance={resumeData.interview_chance}
                    />
                  </ResultCard>

                </div>

                {/* Recruiter Recommendation */}

                <ResultCard title="Recruiter Recommendation">
                  <RecommendationCard
                    recommendation={resumeData.recommendation}
                  />
                </ResultCard>

                {/* Skills */}

                <div className="grid md:grid-cols-2 gap-6">

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

                </div>

                {/* AI Suggestions */}

                <ResultCard title="AI Suggestions">

                  <div className="space-y-3">

                    {resumeData.suggestions?.map(
                      (item: string, index: number) => (

                        <div
                          key={index}
                          className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded"
                        >
                          💡 {item}
                        </div>

                      )
                    )}

                  </div>

                </ResultCard>

                {/* Strengths + Weaknesses */}

                <div className="grid md:grid-cols-2 gap-6">

                  <ResultCard title="Strengths">
                    <StrengthCard
                      strengths={resumeData.strengths}
                    />
                  </ResultCard>

                  <ResultCard title="Weaknesses">
                    <WeaknessCard
                      weaknesses={resumeData.weaknesses}
                    />
                  </ResultCard>

                </div>

                {/* Section Analysis */}

                <ResultCard title="Section Analysis">
                  <SectionAnalysis
                    sections={resumeData.section_analysis}
                  />
                </ResultCard>

              </>
            )}

            <div className="flex justify-center pt-6">

              <button
                onClick={() => setResumeData(null)}
                className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Analyze Another Resume
              </button>

            </div>

          </div>

        )}

      </main>

    </>
  );
}

export default Upload;