import { useState } from "react";

function JDInput() {
  const [jobDescription, setJobDescription] = useState("");

  return (
    <div className="w-full max-w-2xl mt-8">
      <label className="block text-lg font-semibold mb-2">
        Job Description
      </label>

      <textarea
        rows={8}
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full rounded-xl border border-gray-300 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default JDInput;