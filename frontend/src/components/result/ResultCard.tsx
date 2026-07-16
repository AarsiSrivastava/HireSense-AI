
interface ResultCardProps {
  title: string;
  children: React.ReactNode;
}

function ResultCard({ title, children }: ResultCardProps) {
  return (
    <div className="w-full rounded-xl bg-white shadow-lg border p-6">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        {title}
      </h2>

      {children}
    </div>
  );
}

export default ResultCard;