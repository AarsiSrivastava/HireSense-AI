
type Props = {
  recommendation: string;
};

function RecommendationCard({ recommendation }: Props) {
  return (
    <div className="bg-blue-50 border border-blue-300 rounded-xl p-5">
      <h2 className="text-xl font-semibold mb-3">
        AI Recommendation
      </h2>

      <p className="text-gray-700">
        {recommendation}
      </p>
    </div>
  );
}

export default RecommendationCard;