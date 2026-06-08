import "./globals.css";
import { getSupabase } from "../lib/supabase";

export const metadata = {
  title: "AJUPY AI",
  description: "AI Textile Design Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize Supabase once at app level (safe warm-up)
  getSupabase();

  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}