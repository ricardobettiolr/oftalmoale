import { cn } from "@/lib/utils";

const specialties = [
  "Oftalmología general",
  "Segmento anterior",
  "Cirugía de catarata",
  "Córnea",
] as const;

export function SpecialtyLine({
  className,
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "light";
}) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-baseline gap-x-3 gap-y-2",
        className
      )}
      aria-label="Especialidades"
    >
      {specialties.map((item, index) => (
        <li key={item} className="flex items-baseline gap-x-3">
          {index > 0 ? (
            <span
              aria-hidden
              className={cn(
                "select-none text-sm",
                tone === "light" ? "text-white/40" : "text-[var(--color-accent)]/50"
              )}
            >
              ·
            </span>
          ) : null}
          <span
            className={cn(
              "font-display text-xl leading-tight tracking-tight md:text-2xl",
              tone === "light"
                ? "text-white"
                : "text-[var(--color-accent)]"
            )}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
