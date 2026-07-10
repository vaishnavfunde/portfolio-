import "./globals.css";
import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import Navbar from "../components/Navbar";
import ThemeSwitcher from "../components/ThemeSwitcher";
import MouseGlow from "../components/MouseGlow";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"], variable: "--font-poppins" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata = {
  title: "Vaishnav Funde | AI Engineer & Full Stack Developer",
  description: "Portfolio of Vaishnav Funde",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark snap-y snap-mandatory">
      <body className={`${inter.variable} ${poppins.variable} ${space.variable} font-inter overflow-x-hidden antialiased bg-bgLight dark:bg-bgDark text-slate-900 dark:text-slate-50 transition-colors duration-500`}>
        <ThemeProvider>
          <ThemeSwitcher />
          <MouseGlow />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
