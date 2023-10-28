"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./component.module.scss";

import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import Loading from "../../Loading/comoponent";

export default function UploadComponent() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mergeResult, setMergeResult] = useState("null");

  const handleFileChange = event => {
    setMergeResult("null");
    if (!loading) {
      setPdfFiles([...event.target.files]);
      document.getElementById("textFile").style.display = "none";
    }
  };

  const handleMergeClick = async () => {
    setLoading(true);
    const mergedPdf = await PDFDocument.create();
    for (const file of pdfFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      for (const page of pages) {
        mergedPdf.addPage(page);
      }
    }
    const mergedPdfFile = await mergedPdf.save();
    setTimeout(() => {
      setLoading(false);
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      saveAs(blob, "merged.pdf");
      setMergeResult("success");
      setPdfFiles([]);
    }, 2000);
  };

  const handleResetClick = () => {
    setPdfFiles([]);
    setMergeResult("null");
  };

  return (
    <>
      <div className={`${styles.uploadContainer}`}>
        <div className={`${styles.boxUpload}`}>
          {loading ? (
            <Loading />
          ) : pdfFiles.length > 0 ? (
            <>
              <div className={styles.containerList}>
                {pdfFiles.map((file, index) => (
                  <div key={index} className={styles.fileName}>
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <Image
                src={"/file-icon.svg"}
                alt="file-icon"
                height={50}
                width={50}
              />
              <p>
                <span>Click here to upload your PDFs</span> and we will merge
                them for you.
              </p>
            </>
          )}
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            disabled={loading || pdfFiles.length > 0}
          />
        </div>
      </div>
      {!loading && pdfFiles.length > 0 && (
        <div className={styles.rowContent}>
          <button onClick={handleResetClick} className="outlined">
            Reset Merge
          </button>
          <button onClick={handleMergeClick} className="filled">
            Confirm Merge
          </button>
        </div>
      )}
      {mergeResult === "success" && (
        <div className={`${styles.succedMessage}`}>
          <p>Merge successful!</p>
        </div>
      )}
      {mergeResult === "error" && (
        <div className={`${styles.errorMessage}`}>
          <p>Error merging PDFs.</p>
        </div>
      )}
    </>
  );
}
