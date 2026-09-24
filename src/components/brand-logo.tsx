import { cn } from "@/lib/utils";

const logoSources = {
  default: "/assets/logo-v4.png?v=4",
  onDark: "/assets/logo-on-dark.png?v=1",
} as const;

/** Transparent PNG lockup — no black plate, plain img preserves alpha. */
export function BrandLogo({
  className,
  priority = false,
  variant = "default",
}: {
  className?: string;
  priority?: boolean;
  /** onDark = white script text for ink/blue surfaces; eye stays colorful */
  variant?: keyof typeof logoSources;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- preserve PNG alpha reliably
    <img
      src={logoSources[variant]}
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
