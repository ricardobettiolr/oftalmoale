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
  /**
   * none = light nav (dark-text logo)
   * halo = transparent nav over hero (dark-text logo + light scrim)
   * onDark = dark/ink surfaces (white-text logo, no paper plate)
   */
  contrast?: "none" | "halo" | "onDark";
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
        "relative inline-flex min-w-0 shrink bg-transparent",
        className
      )}
      style={{ backgroundColor: "transparent" }}
    >
      {contrast === "halo" && (
        <span aria-hidden className={brandLogoHaloClassName} />
      )}
      <BrandLogo
        priority={priority}
        variant={contrast === "onDark" ? "onDark" : "default"}
        className={cn("relative object-contain object-left", logoClassName)}
      />
    </Link>
  );
}
