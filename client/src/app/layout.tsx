import type { Metadata } from "next";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeaseProtect",
  description: "LeaseProtect Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
      <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
