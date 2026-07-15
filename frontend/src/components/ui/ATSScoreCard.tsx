import { useState } from "react";

function ATSScoreCard() {
  const [score, setScore] = useState(87);

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-lg">
      <h2 className="text-center text-3xl font-bold text-white">
        Resume ATS Score
      </h2>

      <div className="mt-8 text-center">
        <h1
          className={`text-7xl font-bold ${
            score >= 80 ? "text-green-400" : "text-red-400"
          }`}
        >
          {score}%
        </h1>
      </div>

      <div className="mt-8 h-4 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-500"
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <div className="mt-8 space-y-3 text-lg">
        <p>✅ Formatting</p>
        <p>✅ Keywords</p>
        <p>✅ Skills</p>
        <p>❌ Experience</p>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setScore(score + 1)}
          className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          Increase
        </button>

        <button
          onClick={() => setScore(score - 1)}
          className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
        >
          Decrease
        </button>
      </div>
    </div>
  );
}

export default ATSScoreCard;