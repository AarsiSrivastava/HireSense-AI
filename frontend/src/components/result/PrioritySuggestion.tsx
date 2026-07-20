
interface Props {
  suggestions: string[];
}

export default function PrioritySuggestion({
  suggestions,
}: Props) {
  return (
    <div className="space-y-4">
      {suggestions.map((item, index) => {
        let color = "border-green-500";
        let badge = "Low";

        if (
          item.toLowerCase().includes("docker") ||
          item.toLowerCase().includes("project") ||
          item.toLowerCase().includes("rest")
        ) {
          color = "border-red-500";
          badge = "High";
        } else if (
          item.toLowerCase().includes("summary") ||
          item.toLowerCase().includes("experience")
        ) {
          color = "border-yellow-500";
          badge = "Medium";
        }

        return (
          <div
            key={index}
            className={`border-l-4 ${color} bg-gray-50 rounded-lg p-4`}
          >
            <div className="flex justify-between items-center">
              <p>{item}</p>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  badge === "High"
                    ? "bg-red-500 text-white"
                    : badge === "Medium"
                    ? "bg-yellow-400"
                    : "bg-green-500 text-white"
                }`}
              >
                {badge}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}