import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/header";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";



const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'], // optional
  display: 'swap',
});


export const metadata = {
  title: "SucessSync",
  description: "Career coach",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
           
          >
             <Header/>
            <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          </ThemeProvider>
      </body>
    </html>
     </ClerkProvider>
  );
}
