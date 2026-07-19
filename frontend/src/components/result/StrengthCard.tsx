
type Props = {
  strengths: string[];
};

function StrengthCard({ strengths }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Strengths
      </h2>

      <ul className="space-y-2">
        {strengths.map((item, index) => (
          <li
            key={index}
            className="text-green-600"
          >
            ✅ {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StrengthCard;