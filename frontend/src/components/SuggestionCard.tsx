
interface SuggestionCardProps {
  suggestions: string[];
}

export default function SuggestionCard({
  suggestions,
}: SuggestionCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-white">
        AI Suggestions
      </h2>

      <ul className="space-y-3">
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="text-gray-300 flex items-center gap-2"
          >
            ✅ {item}
          </li>
        ))}
      </ul>
    </div>
  );
}