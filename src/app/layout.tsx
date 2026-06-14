import "./globals.css";

export const metadata = {
  title: "AJUPY AI",
  description: "AI Textile Design Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}