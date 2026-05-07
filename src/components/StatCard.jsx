const StatCard = ({
  title,
  value,
  icon,
  color,
  bgColor,
  textColor,
  change,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p
            className="text-sm font-medium truncate mb-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {title}
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-dark)" }}
          >
            {value}
          </p>
          {change && (
            <p
              className="text-xs mt-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl shrink-0 ${bgColor} ${textColor}`}>
          {icon}
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${color}`}
      ></div>
    </div>
  );
};

export default StatCard;
