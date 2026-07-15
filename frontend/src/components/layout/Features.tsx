
import FeatureCard from "../ui/FeatureCard";

const features = [
  {
    icon: "📊",
    title: "ATS Score",
    description: "Get an instant ATS compatibility score for your resume."
  },
  {
    icon: "🤖",
    title: "AI Analysis",
    description: "Receive AI-powered suggestions to improve your resume."
  },
  {
    icon: "🎯",
    title: "JD Match",
    description: "Compare your resume with any job description."
  },
  {
    icon: "📈",
    title: "Skill Gap",
    description: "Discover missing skills recruiters expect."
  },
  {
    icon: "📄",
    title: "PDF Report",
    description: "Download a detailed ATS analysis report."
  },
  {
    icon: "📂",
    title: "Dashboard",
    description: "Manage resumes and view previous analyses."
  }
];

function Features() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-5xl font-bold text-white">
          Powerful Features
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-slate-400">
          Everything you need to optimize your resume and increase your chances of getting interviews.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;