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
      className={`overflow-hidden rounded-xl border border-sage-100 bg-white shadow-soft ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-sage-100 bg-sage-50">
              <th className="px-4 py-3 font-semibold text-sage-600 sm:px-5">
                Quote ID
              </th>
              <th className="px-4 py-3 font-semibold text-sage-600 sm:px-5">
                Date
              </th>
              <th className="hidden px-4 py-3 font-semibold text-sage-600 sm:table-cell sm:px-5">
                Products
              </th>
              <th className="px-4 py-3 font-semibold text-sage-600 sm:px-5">
                Pieces
              </th>
              <th className="px-4 py-3 font-semibold text-sage-600 sm:px-5">
                Subtotal
              </th>
              <th className="px-4 py-3 font-semibold text-sage-600 sm:px-5">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100">
            {requests.map((req) => (
              <tr
                key={req.id}
                className="transition-colors hover:bg-sage-50/50"
              >
                <td className="max-w-[100px] px-4 py-3 font-mono text-xs text-sage-500 sm:px-5">
                  {shortenId(req.id)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sage-700 sm:px-5">
                  {formatDate(req.created_at)}
                </td>
                <td className="hidden whitespace-nowrap px-4 py-3 text-sage-700 sm:table-cell sm:px-5">
                  {req.unique_products ?? req.items?.length ?? "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sage-700 sm:px-5">
                  {req.desired_total_pieces ?? "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-sage-800 sm:px-5">
                  {formatCurrency(req.estimated_subtotal)}
                </td>
                <td className="px-4 py-3 sm:px-5">
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
