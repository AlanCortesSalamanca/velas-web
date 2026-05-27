const statusStyles = {
  received: "bg-sage-100 text-sage-700",
  contacted: "bg-brand-100 text-brand-700",
  completed: "bg-mint-100 text-mint-700",
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
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[key] || statusStyles.received
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          key === "received"
            ? "bg-sage-500"
            : key === "contacted"
            ? "bg-brand-500"
            : "bg-mint-500"
        }`}
      />
      {statusLabels[key] || status}
    </span>
  );
}
