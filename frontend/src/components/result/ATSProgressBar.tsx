
type Props = {
  score: number;
};

function ATSProgressBar({ score }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between font-semibold">
        <span>ATS Compatibility</span>
        <span>{score}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">
        <div
          className={`h-5 rounded-full transition-all duration-1000 ${
            score >= 80
              ? "bg-green-500"
              : score >= 60
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default ATSProgressBar;