import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "RentYard - Property Management Platform",
  description: "Manage your condominiums with ease",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(poppins.variable, "font-sans")}
    >
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-white">{children}</div>
      </body>
    </html>
  );
}
