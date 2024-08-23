import { Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import StateClient from "./context/StateClient";
import Sidebar from "./components/Sidebar";
import { Provider } from "jotai";
const inter = Noto_Sans_Georgian({ subsets: ["latin"], weight: "400" });
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <StateClient>
          <body className={`${inter.className} grid grid-cols-12`}>
            <Sidebar />
            {children}
          </body>
        </StateClient>
      </Provider>
    </html>
  );
}
