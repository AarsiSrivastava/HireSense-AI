
interface ATSScoreProps {
  score: number;
}

function ATSScore({ score }: ATSScoreProps) {
  return (
    <div className="text-center">

      <h2 className="text-2xl font-bold mb-6">
        ATS Score
      </h2>

      <div className="mx-auto w-44 h-44 rounded-full border-8 border-green-500 flex items-center justify-center">

        <span className="text-5xl font-bold">
          {score}%
        </span>

      </div>

    </div>
  );
}

export default ATSScore;