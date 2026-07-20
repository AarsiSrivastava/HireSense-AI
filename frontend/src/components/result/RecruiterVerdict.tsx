
type Props = {
  recommendation: string;
};

function RecruiterVerdict({ recommendation }: Props) {
  let bg = "bg-yellow-100";
  let text = "text-yellow-800";
  let emoji = "🤔";

  if (recommendation?.toLowerCase().includes("hire")) {
    bg = "bg-green-100";
    text = "text-green-700";
    emoji = "✅";
  } else if (recommendation?.toLowerCase().includes("reject")) {
    bg = "bg-red-100";
    text = "text-red-700";
    emoji = "❌";
  }

  return (
    <div className={`${bg} ${text} p-6 rounded-xl text-center shadow`}>
      <h2 className="text-2xl font-bold mb-2">
        {emoji} AI Recruiter Verdict
      </h2>

      <p className="text-lg font-semibold">
        {recommendation}
      </p>
    </div>
  );
}

export default RecruiterVerdict;