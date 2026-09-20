import { cn } from "@/lib/utils";

/** Transparent PNG lockup — no black plate, plain img preserves alpha. */
export function BrandLogo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- preserve PNG alpha reliably
    <img
      src="/assets/logo-transparent.png?v=2"
      alt="Oftalmoale — Dra. María Alejandra Rojas"
      width={2105}
      height={399}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={cn("h-auto w-auto bg-transparent", className)}
      style={{ backgroundColor: "transparent" }}
    />
  );
}
