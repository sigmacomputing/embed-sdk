// example-link.tsx
"use client";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation';
import Link from "next/link";

export default function ExampleLink({ href, linkText }) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname === href ? "text-foreground" : "text-foreground/60"
      )}
    >
      {linkText}
    </Link>
  );
}