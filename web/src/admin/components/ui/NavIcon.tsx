"use client";

import type { NavItem } from "@/admin/lib/types";

export function NavIcon({ name, className }: { name: NavItem["icon"]; className?: string }) {
  const props = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };

  switch (name) {
    case "overview":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      );
    case "retreats":
      return (
        <svg {...props}>
          <path d="M4 20h16" />
          <path d="m8 20 4-10 3 6 2-3 3 7H8z" />
          <path d="M6 10h.01" />
        </svg>
      );
    case "events":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18" />
          <path d="M8 3v4M16 3v4" />
        </svg>
      );
    case "students":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M3 19c1.5-3 4-4.5 6-4.5s4.5 1.5 6 4.5" />
          <path d="M14 19c.8-1.8 2.2-2.8 3.5-2.8 1 0 2 .5 2.5 1.3" />
        </svg>
      );
    case "forms":
      return (
        <svg {...props}>
          <path d="M8 4h8a2 2 0 0 1 2 2v14l-6-3-6 3V6a2 2 0 0 1 2-2z" />
          <path d="M10 9h4M10 13h4" />
        </svg>
      );
    case "content":
      return (
        <svg {...props}>
          <path d="M4 6h16M4 12h10M4 18h14" />
        </svg>
      );
    case "settings":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2M12 19v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M3 12h2M19 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      );
  }
}
