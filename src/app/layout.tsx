import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "../components/layout/sidebar";

export const metadata: Metadata = {
  title: "AJUPY AI",
  description: "AI Powered SaaS Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <div className="flex min-h-screen w-full">
          
          {/* Sidebar */}
          <div className="w-[260px] flex-shrink-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 p-6 bg-black text-white">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}