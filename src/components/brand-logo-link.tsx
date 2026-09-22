import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

/** Soft radial scrim — same treatment as transparent nav over the hero. */
export const brandLogoHaloClassName =
  "pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[160%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(247,250,251,0.55)_0%,transparent_70%)]";

type BrandLogoLinkProps = {
  className?: string;
  logoClassName?: string;
  priority?: boolean;
  onClick?: () => void;
  /** none = header on light surface; halo = nav over hero; plate = solid paper on dark bg */
  contrast?: "none" | "halo" | "plate";
};

export function BrandLogoLink({
  className,
  logoClassName,
  priority = false,
  onClick,
  contrast = "none",
}: BrandLogoLinkProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Oftalmoale — Dra. María Alejandra Rojas"
      className={cn(
        "relative inline-flex min-w-0 shrink",
        contrast === "plate" &&
          "rounded-md bg-[var(--color-paper)] px-3 py-2 shadow-[0_1px_0_rgba(11,39,64,0.06)]",
        contrast !== "plate" && "bg-transparent",
        className
      )}
      style={
        contrast !== "plate" ? { backgroundColor: "transparent" } : undefined
      }
    >
      {(contrast === "halo" || contrast === "plate") && (
        <span aria-hidden className={brandLogoHaloClassName} />
      )}
      <BrandLogo
        priority={priority}
        className={cn("relative object-contain object-left", logoClassName)}
      />
    </Link>
  );
}
