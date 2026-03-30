
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/sanskriti/favicon.webp",
    shortcut: "/sanskriti/favicon.webp",
    apple: "/sanskriti/favicon.webp",
  },
};

export default function UniversityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
