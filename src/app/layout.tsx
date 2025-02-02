
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./Navigation/Nav";
import Footer from "./Footer";
import NextUIContextProvider from './providers/NextUIContextProvider';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <NextUIContextProvider>
        <div className="flex flex-col justify-start items-center min-h-screen min-w-screen max-w-screen font-[family-name:var(--font-geist-sans)]">

          <header>  
            <Nav />
          </header>

          <main className="flex  items-center justify-center">
            {children}
          </main>

          <Footer />
          
        </div>
        </NextUIContextProvider>
      </body>
      
    </html>
    
  );
}
