interface SummaryCardProps {
  title: string;
  value: number;
  color?: "blue" | "red" | "yellow" | "green" | "orange";
}

const colorMap = {
  orange: "bg-orange-400 text-white font-bold",
  blue: "bg-blue-500 text-white font-bold",
  red: "bg-red-500 text-white font-bold",
  yellow: "bg-yellow-400 text-white font-bold",
  green:"bg-green-400 text-white font-bold"
};

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, color = "blue" }) => {
  return (
    <div className={`p-4 rounded-2xl shadow-md ${colorMap[color]}`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-xl font-bold">{value.toLocaleString()}</h2>
    </div>
  );
};

export default SummaryCard;
