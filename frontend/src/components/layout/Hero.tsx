function Hero() {
  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
        Beat the ATS.
        <br />
        Get More Interviews.
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-slate-400">
        HireSense AI analyzes your resume, compares it with job descriptions,
        and provides AI-powered suggestions to increase your ATS score.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-700">
          Upload Resume
        </button>

        <button className="rounded-xl border border-slate-700 px-8 py-4 text-lg hover:bg-slate-800">
          View Demo
        </button>
      </div>
    </section>
  );
}

export default Hero;