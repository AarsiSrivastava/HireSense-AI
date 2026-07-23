interface ResultCardProps {
  title: string;
  children: React.ReactNode;
}

function ResultCard({ title, children }: ResultCardProps) {
  return (
    <div
      className="
        w-full
        rounded-2xl
        bg-white/80
        backdrop-blur-md
        border
        border-slate-200
        shadow-xl
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      <h2 className="mb-5 text-2xl font-bold text-slate-800 border-b border-slate-200 pb-3">
        {title}
      </h2>

      {children}
    </div>
  );
}

export default ResultCard;