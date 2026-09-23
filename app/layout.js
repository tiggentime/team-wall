import "./globals.css";

export const metadata = {
  title: "Team Wall",
  description: "Our team, one pull request at a time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
