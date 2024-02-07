"use client";
import React, { createContext, useState } from "react";

import Footer from "./_components/Layout/footer/component";
import Header from "./_components/Layout/header/component";

import "./global.scss";

import toast, { Toaster } from "react-hot-toast";

import { Rubik } from "next/font/google";
import Head from "next/head";
const rubik = Rubik({
  subsets: ["latin"],
  display: "swap"
});

export const FileContext = createContext();

export default function RootLayout({ children }) {
  const [fileInfo, setFileInfo] = useState(null);
  const [optionSelected, setOptionSelected] = useState("merge");
  const [levelCompression, setLevelCompression] = useState(2);

  return (
    <FileContext.Provider
      value={{
        fileInfo,
        setFileInfo,
        optionSelected,
        setOptionSelected,
        levelCompression,
        setLevelCompression
      }}
    >
      <html lang="en" className={rubik.className}>
        <Head>
          <title>NODFF: PDFs Merge & Compress Management</title>
          <meta
            name="description"
            content="This is a powerful and user-friendly PDF management tool built with Next.js. It provides users with the ability to merge and compress PDF files with ease."
          />
          <meta
            name="keywords"
            content="pdf, design, development, pdf-document, pdf-merger, nognog, NOGNOG, Design, pdf-tool, compress pdf, compress, merge pdf, merge"
          />
          <meta name="author" content="nognog-dev" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="date" content="2024-02-06" />
          <meta name="url" content="https://nodff-pdf.vercel.app/" />
        </Head>
        <body style={{ margin: "unset" }}>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </body>
      </html>
    </FileContext.Provider>
  );
}
