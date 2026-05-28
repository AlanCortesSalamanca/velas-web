const statusStyles = {
  received: "bg-sage-100/80 text-sage-600",
  contacted: "bg-terra-100/80 text-terra-700",
  completed: "bg-mint-100/80 text-mint-700",
};

const statusLabels = {
  received: "Received",
  contacted: "Contacted",
  completed: "Completed",
};

export default function StatusBadge({ status = "received", className = "" }) {
  const key = status?.toLowerCase() || "received";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        statusStyles[key] || statusStyles.received
      } ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          key === "received"
            ? "bg-sage-400"
            : key === "contacted"
            ? "bg-terra-500"
            : "bg-mint-500"
        }`}
      />
      {statusLabels[key] || status}
    </span>
  );
}
