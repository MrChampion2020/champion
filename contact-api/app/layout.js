import "./globals.css";

export const metadata = {
  title: "Champion Contact API",
  description: "Minimal Next.js contact API for Vercel, Supabase, and Resend.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
