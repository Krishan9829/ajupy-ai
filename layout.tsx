export const metadata = {
  title: "AJUPY AI",
  description: "AI Fashion SaaS Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#000", color: "#fff", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}