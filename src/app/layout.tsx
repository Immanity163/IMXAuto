import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Metadata } from "next";
import { Nunito_Sans} from "next/font/google";;
import '@/styles/global.scss' 

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "cyrillic"], // чтобы работала кириллица
  weight: ["600", "700", "800"], // нужные веса
  variable: "--font-nunito",     // CSS-переменная
});


export const metadata: Metadata = {
  title: "IMX AUTO | Главная",
  description: "Покупка авто из-за рубежа",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={nunitoSans.variable}>
      <body className="shell">
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}