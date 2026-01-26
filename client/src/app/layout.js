import { Poppins } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./components/layout/Loading";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Swap",
  description: "E-Commerce Website",
};

import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased text-white bg-neutral-950`}>
        <Providers>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

