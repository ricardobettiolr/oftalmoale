"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="order-3 flex w-full flex-wrap gap-1 md:order-2 md:w-auto md:flex-1" aria-label="Principal">
      {items.map((i) => {
        const activo = i.href === "/sistema" ? pathname === "/sistema" : pathname.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={activo ? "page" : undefined}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activo ? "bg-white text-sky-900" : "text-sky-50 hover:bg-white/15 hover:text-white"
            }`}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
