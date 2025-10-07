export default function SummaryCard({ 
  title, 
  amount, 
  count, 
  subtitle, 
  bgColor 
}: { 
  title: string; 
  amount: number; 
  count?: number; 
  subtitle?: string; 
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-lg shadow-sm p-6`}>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-gray-900">
          Rs. {amount.toLocaleString()}
        </p>
      </div>
      {subtitle && (
        <p className="text-xs text-green-600 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
