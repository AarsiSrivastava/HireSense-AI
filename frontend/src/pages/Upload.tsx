import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import UploadBox from "../components/ui/UploadBox";
import JDInput from "../components/ui/JDInput";
import AnalyzeButton from "../components/ui/AnalyzeButton";
import SuggestionCard from "../components/SuggestionCard";
import ResultCard from "../components/result/ResultCard";
import SkillBadge from "../components/result/SkillBadge";
import ATSScore from "../components/result/ATSScore";
import InterviewChance from "../components/result/InterviewChance";
import RecommendationCard from "../components/result/RecommendationCard";
import StrengthCard from "../components/result/StrengthCard";
import WeaknessCard from "../components/result/WeaknessCard";
import SectionAnalysis from "../components/result/SectionAnalysis";
import ResumeStrength from "../components/result/ResumeStrength";
import api from "../api/resumeApi";
import SkillsChart from "../components/result/SkillsChart";
import ATSProgressBar from "../components/result/ATSProgressBar";
import SummaryCard from "../components/result/SummaryCard";
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
  const suggestions = [
  "Add Docker to your Skills section",
  "Improve your Professional Summary",
  "Include measurable achievements",
  "Mention REST API experience",
  "Reduce resume length to one page",
];
   
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
            <div className="grid md:grid-cols-4 gap-5">

  <SummaryCard
    title="ATS Score"
    value={`${resumeData.ats_score}%`}
    color="bg-blue-600"
  />

  <SummaryCard
    title="Matched Skills"
    value={resumeData.matched_skills?.length || 0}
    color="bg-green-600"
  />

  <SummaryCard
    title="Missing Skills"
    value={resumeData.missing_skills?.length || 0}
    color="bg-red-500"
  />

  <SummaryCard
    title="Interview Chance"
    value={`${resumeData.interview_chance}%`}
    color="bg-purple-600"
  />

</div>

            {resumeData.analysis_type === "resume" ? (

              <>

                <ResultCard title="Resume Quality Score">

  <ATSScore score={resumeData.resume_score} />

  <div className="mt-6">
    <ResumeStrength score={resumeData.resume_score} />
  </div>

</ResultCard>

                <ResultCard title="Suggestions">
  <SuggestionCard
    suggestions={
      resumeData.suggestions?.length
        ? resumeData.suggestions
        : suggestions
    }
  />
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

  <div className="mt-6">
    <ResumeStrength score={resumeData.ats_score} />
  </div>

</ResultCard>
<ResultCard title="ATS Compatibility">
  <ATSProgressBar score={resumeData.ats_score} />
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
                  <ResultCard title="Skills Distribution">

  <SkillsChart
    matched={resumeData.matched_skills?.length || 0}
    missing={resumeData.missing_skills?.length || 0}
  />

</ResultCard>

                </div>

                {/* AI Suggestions */}

                <ResultCard title="AI Suggestions">
  <SuggestionCard
    suggestions={
      resumeData.suggestions?.length
        ? resumeData.suggestions
        : suggestions
    }
  />
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

                        <div className="flex justify-center gap-4 pt-6">

              <button
                onClick={() => window.print()}
                className="px-8 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Download Report
              </button>

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