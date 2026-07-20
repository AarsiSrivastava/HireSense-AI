
type ResumeStrengthProps = {
  score: number;
};

function ResumeStrength({ score }: ResumeStrengthProps) {
  let color = "bg-red-500";
  let status = "Needs Improvement";

  if (score >= 80) {
    color = "bg-green-500";
    status = "Excellent";
  } else if (score >= 60) {
    color = "bg-yellow-500";
    status = "Good";
  }

  return (
    <div className="space-y-4">

      <div className="flex justify-between font-semibold">
        <span>Resume Strength</span>
        <span>{score}%</span>
      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

        <div
          className={`${color} h-full rounded-full transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />

      </div>

      <p className="text-center text-lg font-bold">
        {status}
      </p>

    </div>
  );
}

export default ResumeStrength;