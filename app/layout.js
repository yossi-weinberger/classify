"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/sidebar V2/sidebar";
import Footer from "@/components/footer/footer";
import SortProvider from '@/providers/SortProvider';
import { ChakraProvider } from '@chakra-ui/react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <SessionProvider>
            <SortProvider>
              <div className="app-container">
                <Sidebar />
                <main className="content-container">{children}</main>
                {/* <Footer /> */}
              </div>
            </SortProvider>
          </SessionProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}