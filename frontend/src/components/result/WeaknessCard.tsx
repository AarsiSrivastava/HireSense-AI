
type Props = {
  weaknesses: string[];
};

function WeaknessCard({ weaknesses }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Weaknesses
      </h2>

      <ul className="space-y-2">
        {weaknesses.map((item, index) => (
          <li
            key={index}
            className="text-red-500"
          >
            ❌ {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeaknessCard;