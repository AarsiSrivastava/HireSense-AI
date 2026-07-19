
type Props = {
  chance: number;
};

function InterviewChance({ chance }: Props) {
  return (
    <div className="flex flex-col items-center py-6">
      <h2 className="text-xl font-semibold mb-2">
        Interview Chance
      </h2>

      <div className="text-5xl font-bold text-green-500">
        {chance}%
      </div>
    </div>
  );
}

export default InterviewChance;