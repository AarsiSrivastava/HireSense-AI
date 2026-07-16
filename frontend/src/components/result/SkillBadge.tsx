
interface SkillBadgeProps {
  skill: string;
  color: "green" | "red";
}

function SkillBadge({ skill, color }: SkillBadgeProps) {
  const styles =
    color === "green"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`px-4 py-2 rounded-full font-medium ${styles}`}
    >
      {skill}
    </span>
  );
}

export default SkillBadge;