import { Inter } from "next/font/google";
import "./globals.css";
import StateClient from "./context/StateClient";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StateClient>
        <body className={`${inter.className} grid grid-cols-12`}>
          <Sidebar />
          {children}
        </body>
      </StateClient>
    </html>
  );
}
