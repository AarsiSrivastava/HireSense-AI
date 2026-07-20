
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  matched: number;
  missing: number;
};

const COLORS = ["#22c55e", "#ef4444"];

function SkillsChart({ matched, missing }: Props) {
  const data = [
    {
      name: "Matched",
      value: matched,
    },
    {
      name: "Missing",
      value: missing,
    },
  ];

  return (
    <div className="w-full h-80">

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default SkillsChart;