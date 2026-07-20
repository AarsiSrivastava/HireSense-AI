
type Props = {
  title: string;
  value: string | number;
  color: string;
};

function SummaryCard({ title, value, color }: Props) {
  return (
    <div
      className={`rounded-xl shadow-md p-6 text-white ${color}`}
    >
      <p className="text-sm opacity-90">{title}</p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

export default SummaryCard;