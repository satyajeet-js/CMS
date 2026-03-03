const StatCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    blue: "text-blue-600",
    orange: "text-orange-500",
    indigo: "text-indigo-600",
    green: "text-green-600",
  };

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      </div>
      <Icon size={36} className={colors[color]} />
    </div>
  );
};

export default StatCard;
