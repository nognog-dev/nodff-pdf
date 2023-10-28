"use client";
import Footer from "./_components/Layout/footer/component";
import Header from "./_components/Layout/header/component";
import "./global.scss";

import { Rubik } from 'next/font/google'
const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
})
 

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={rubik.className}>
      <body style={{ margin: "unset" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
