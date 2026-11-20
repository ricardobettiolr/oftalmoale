export default function Dato({ label, value, className = "" }: { label: string; value?: string | number | null; className?: string }) {
  return (
    <div className={className}>
      <dt className="text-xs font-medium text-slate-600">{label}</dt>
      <dd className="mt-0.5 whitespace-pre-wrap text-sm text-slate-900">{value === null || value === undefined || value === "" ? "—" : value}</dd>
    </div>
  );
}
