import ATSScoreCard from "../ui/ATSScoreCard";

function ATSPreview() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-5xl font-bold text-white">
          ATS Score Preview
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-slate-400">
          See how HireSense AI helps optimize your resume before applying.
        </p>

        <div className="mt-16">
          <ATSScoreCard />
        </div>
      </div>
    </section>
  );
}

export default ATSPreview;