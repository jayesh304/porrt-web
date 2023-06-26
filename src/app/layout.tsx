import Nav from "@/components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Porrt - Consolidate Your Links in One Place.",
  description:
    "Share, Showcase, and Shine! - With the help of our effective bio link service, create a striking online portfolio, personal brand, or business profile.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-custom flex flex-col`}>
        <AuthContextProvider>
          <main className="flex flex-col min-h-[100vh] bg-black/10 backdrop-blur-[2px] overflow-hidden">
            <Nav />
            <div className="grow flex flex-col items-center w-full h-full p-4 max-w-[96rem] mx-auto ">
              {children}
            </div>
            <Footer />
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
