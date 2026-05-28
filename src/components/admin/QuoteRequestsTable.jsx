import StatusBadge from "./StatusBadge";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  } catch {
    return "—";
  }
}

function formatCurrency(value) {
  if (value == null) return "—";
  return `$${Number(value).toFixed(2)}`;
}

function shortenId(id) {
  if (!id) return "—";
  if (typeof id === "string" && id.length > 8) {
    return id.slice(0, 8) + "...";
  }
  return String(id);
}

export default function QuoteRequestsTable({ requests = [], className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border border-sage-100/60 shadow-soft ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage-100/60 bg-sage-50/50">
              <th className="px-5 py-4 font-semibold text-sage-500 text-xs uppercase tracking-wider sm:px-6">
                Quote ID
              </th>
              <th className="px-5 py-4 font-semibold text-sage-500 text-xs uppercase tracking-wider sm:px-6">
                Date
              </th>
              <th className="hidden px-5 py-4 font-semibold text-sage-500 text-xs uppercase tracking-wider sm:table-cell sm:px-6">
                Products
              </th>
              <th className="px-5 py-4 font-semibold text-sage-500 text-xs uppercase tracking-wider sm:px-6">
                Pieces
              </th>
              <th className="px-5 py-4 font-semibold text-sage-500 text-xs uppercase tracking-wider sm:px-6">
                Subtotal
              </th>
              <th className="px-5 py-4 font-semibold text-sage-500 text-xs uppercase tracking-wider sm:px-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100/40">
            {requests.map((req, i) => (
              <tr
                key={req.id}
                className="transition-all duration-200 hover:bg-sage-50/40"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <td className="max-w-[100px] px-5 py-4 sm:px-6">
                  <code className="font-mono text-xs text-sage-400 bg-sage-100/50 px-2 py-1 rounded-md">
                    {shortenId(req.id)}
                  </code>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sage-600 sm:px-6">
                  {formatDate(req.created_at)}
                </td>
                <td className="hidden whitespace-nowrap px-5 py-4 text-sage-600 sm:table-cell sm:px-6">
                  {req.unique_products ?? req.items?.length ?? "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 font-medium text-sage-700 sm:px-6">
                  {req.desired_total_pieces ?? "—"}
                </td>
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-sage-800 sm:px-6">
                  {formatCurrency(req.estimated_subtotal)}
                </td>
                <td className="px-5 py-4 sm:px-6">
                  <StatusBadge status={req.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { StatusBadge };
