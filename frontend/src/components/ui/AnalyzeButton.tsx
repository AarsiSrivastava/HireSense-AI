interface AnalyzeButtonProps {
  onClick: () => void;
  loading: boolean;
}

function AnalyzeButton({
  onClick,
  loading,
}: AnalyzeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-500"
    >
      {loading ? "Analyzing..." : "Analyze Resume"}
    </button>
  );
}

export default AnalyzeButton