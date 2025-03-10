import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/shared/header";


export const metadata: Metadata = {
  title: "Главная | Next Pizza",
};

export default function HomeLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;

}>) {
  return (
      <main className="min-h-screen">
        <Header />
        {children}
        {modal}
      </main>
  );
}
