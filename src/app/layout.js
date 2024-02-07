"use client";
import React, { createContext, useState } from "react";

import Footer from "./_components/Layout/footer/component";
import Header from "./_components/Layout/header/component";

import "./global.scss";

import toast, { Toaster } from "react-hot-toast";

import { Rubik } from "next/font/google";
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
