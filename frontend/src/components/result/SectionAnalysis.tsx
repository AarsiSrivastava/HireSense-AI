
type Props = {
  sections: {
    [key: string]: string;
  };
};

function SectionAnalysis({ sections }: Props) {
  return (
    <div className="space-y-3">
      {Object.entries(sections).map(([section, status]) => (
        <div
          key={section}
          className="flex justify-between border-b pb-2"
        >
          <span className="font-medium">
            {section}
          </span>

          <span
            className={
              status === "Excellent"
                ? "text-green-600 font-semibold"
                : status === "Good"
                ? "text-blue-600 font-semibold"
                : "text-red-500 font-semibold"
            }
          >
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SectionAnalysis;