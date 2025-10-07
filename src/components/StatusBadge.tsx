export default function StatusBadge({ status }: { status: "Paid" | "Partial" | "Unpaid" }) {
  const colors = {
    Paid: "bg-green-100 text-green-800",
    Partial: "bg-yellow-100 text-yellow-800",
    Unpaid: "bg-red-100 text-red-800"
  };

  return (
    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>
      {status}
    </span>
  );
}
