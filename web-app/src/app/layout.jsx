import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import GlobalLoader from "./components/GlobalLoader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "St. Joseph Cupertino Driving School | Tagum City",
  description: "LTO-Accredited Driving School in Tagum City.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: "class",
              theme: {
                extend: {
                  colors: {
                    brand: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617', },
                    accent: { 500: '#d97706', 600: '#b45309', }
                  },
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    display: ['Plus Jakarta Sans', 'sans-serif'],
                  }
                }
              }
            };
          `
        }}></script>
      </head>
      <body className={`${inter.variable} ${jakarta.variable} bg-slate-50 text-slate-800 antialiased selection:bg-slate-900 selection:text-white`}>
        <GlobalLoader />
        {children}
      </body>
    </html>
  );
}
