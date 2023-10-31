import AuthProvider from "@/contexts/AuthContext";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trello Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyStyle = {
    backgroundColor: "#1D2125",
  };

  return (
    <html lang="en">
      <body className={inter.className} style={bodyStyle}>
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
