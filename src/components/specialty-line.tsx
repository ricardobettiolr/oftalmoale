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
        // Mobile: single column (never 2+1 wrap). md+: one horizontal row with ·
        "flex flex-col gap-y-2 md:flex-row md:flex-nowrap md:items-baseline md:gap-x-3",
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
                "hidden select-none text-sm md:inline",
                tone === "light" ? "text-white/40" : "text-[var(--color-accent)]/50"
              )}
            >
              ·
            </span>
          ) : null}
          <span
            className={cn(
              "font-display text-lg leading-tight tracking-tight md:text-xl lg:text-2xl",
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
