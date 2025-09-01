import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Thomas Gale",
  description: "Engineering interesting things",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">{children}</body>
    </html>
  );
}
