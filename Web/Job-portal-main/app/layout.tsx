import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/HOC/ClientProvider";
import { Nav, Footer, ScrollToTop } from "@/paths";

const font = Plus_Jakarta_Sans({ weight: ['200', '300', '400', '500', '600', '700', '800'], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banu Job Platform",
  description: "Find the best job opportunities across various industries on Banu Job Platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={font.className}>
          <Nav />
          {children}
          <ScrollToTop />
          <Footer />
        </body>
      </html>
    </ClientProvider>

  );
}
