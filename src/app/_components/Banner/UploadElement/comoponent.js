"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import Image from "next/image";

import { FileContext } from "@/app/layout";
import { pdfMergeNODFF, compressPDF } from "@/app/_utils/pdfUtils";

import { PdfOptionsComponent } from "./PdList/component";

import styles from "./component.module.scss";
import toast, { LoaderIcon } from "react-hot-toast";

// PDF IMAGE PREVIEW IMPORTS
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import PDFSucced from "./PdfSucceed/component";
import PdfCompressOptions from "./PdfCompressOptions/component";
import Link from "next/link";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const getInitialOrder = files =>
  files.reduce((acc, file, index) => {
    acc[file.id] = index + 1;
    return acc;
  }, {});

export default function UploadComponent() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileOrder, setFileOrder] = useState({});
  const [didSucced, setDidSucced] = useState(null);
  const [isDeletable, setIsDeletable] = useState(false);
  const [deletableItemId, setDeletableItemId] = useState(null);
  const [beforeSizeFile, setBeforeSizeFile] = useState(0);

  const {
    optionSelected,
    setOptionSelected,
    fileInfo,
    setFileInfo,
    levelCompression
  } = useContext(FileContext);

  const handleFileChange = useCallback(
    event => {
      const newFiles = Array.from(event.target.files).map((file, index) => ({
        file,
        id: index
      }));
      setPdfFiles(newFiles);
      setFileOrder(getInitialOrder(newFiles));
    },
    [pdfFiles]
  );

  const handleOrderChange = useCallback((fileId, newOrder) => {
    setFileOrder(prevOrder => {
      const newFileOrder = { ...prevOrder };
      const currentOrder = newFileOrder[fileId];
      const fileToSwap = Object.keys(newFileOrder).find(
        key => newFileOrder[key] === parseInt(newOrder)
      );

      if (fileToSwap) {
        newFileOrder[fileToSwap] = currentOrder;
      }

      newFileOrder[fileId] = parseInt(newOrder);
      return newFileOrder;
    });
  }, []);

  const handleReset = useCallback(() => {
    setPdfFiles([]);
    setDidSucced(null);
  }, []);

  const handleDelete = useCallback(
    fileId => {
      const orderOfDeletedFile = fileOrder[fileId];

      setPdfFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));

      setFileOrder(prevOrder => {
        const newOrder = { ...prevOrder };
        delete newOrder[fileId];

        Object.keys(newOrder).forEach(key => {
          if (newOrder[key] > orderOfDeletedFile) {
            newOrder[key] -= 1;
          }
        });
        toast.success("PDF Removed.");
        return newOrder;
      });
    },
    [fileOrder]
  );

  const handleWantToDelete = useCallback(() => {
    setIsDeletable(!isDeletable);
  }, [isDeletable]);

  const setIsDeletableForItem = id => {
    setDeletableItemId(id);
  };

  const handleCloseDelete = () => {
    setDeletableItemId(null);
    setIsDeletable(!isDeletable);
  };

  const handleMerge = useCallback(() => {
    const orderedFiles = Object.entries(fileOrder)
      .sort((a, b) => a[1] - b[1])
      .map(([id]) => pdfFiles.find(file => file.id.toString() === id).file);
    pdfMergeNODFF(
      orderedFiles,
      setLoading,
      setPdfFiles,
      setDidSucced,
      setFileInfo
    );
  }, [pdfFiles, fileOrder]);

  const handleCompress = useCallback(async () => {
    setOptionSelected("compress");
    let file;
    if (pdfFiles.length > 0) {
      file = pdfFiles[0].file;
    } else {
      file = fileInfo.file;
    }
    const quality = levelCompression;
    setBeforeSizeFile(file.size);
    await compressPDF(
      file,
      quality,
      setLoading,
      setDidSucced,
      setFileInfo,
      setPdfFiles
    );
  }, [pdfFiles]);

  useEffect(() => {
    const orderedFiles = Object.entries(fileOrder)
      .sort((a, b) => a[1] - b[1])
      .map(([id]) => pdfFiles.find(file => file.id.toString() === id));

    setPdfFiles(orderedFiles);
  }, [fileOrder]);

  return (
    <>
      <div className={`${styles.uploadContainer}`}>
        <div className={`${styles.boxUpload}`}>
          {pdfFiles.length > 0 ? (
            <div className={styles.containerList}>
              {optionSelected === "merge" &&
                pdfFiles.map(item => (
                  <div key={item.id} className={styles.fileInfo}>
                    <div className={styles.pdfPreview}>
                      <Document file={item.file}>
                        <Page pageNumber={1} className="pagePdf" />
                      </Document>
                      <span>{item.file.name}</span>
                    </div>
                    <PdfOptionsComponent
                      isLoading={loading}
                      isDeletable={deletableItemId === item.id}
                      handleCloseDelete={handleCloseDelete}
                      handleWantToDelete={handleWantToDelete}
                      setIsDeletableForItem={setIsDeletableForItem}
                      handleDelete={handleDelete}
                      fileOrder={fileOrder}
                      handleOrderChange={handleOrderChange}
                      pdfFiles={pdfFiles}
                      item={item}
                    />
                  </div>
                ))}

              {optionSelected === "compress" &&
                (didSucced === true ? (
                  ""
                ) : (
                  <PdfCompressOptions item={pdfFiles[0]} loading={loading} />
                ))}
            </div>
          ) : didSucced === true ? (
            <PDFSucced file={fileInfo} beforeSizeFile={beforeSizeFile} />
          ) : (
            <>
              <Image
                src={"/file-icon.svg"}
                alt="file-icon"
                height={50}
                width={50}
              />
              <p>
                <span>Click here to upload your PDFs</span> and we will{" "}
                {optionSelected === "merge"
                  ? "merge "
                  : optionSelected === "compress"
                  ? "compress "
                  : "figure out what to do with "}
                them for you.
              </p>
            </>
          )}
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
            disabled={loading || pdfFiles.length > 0 || didSucced === true}
            style={{
              display: pdfFiles.length > 0 || didSucced === true ? "none" : ""
            }}
          />
        </div>
      </div>
      {pdfFiles.length > 0 && (
        <div className={styles.rowContent}>
          <button onClick={handleReset} className="outlined" disabled={loading}>
            {optionSelected === "compress" && "Reset Compress"}
            {optionSelected === "merge" && "Reset Merge"}
            <Image
              src={"/assets/icons/pdf-resest-black.svg"}
              alt="reset-icon"
              width={20}
              height={20}
            />
          </button>
          <button
            onClick={
              optionSelected === "compress" ? handleCompress : handleMerge
            }
            className="filled"
            disabled={loading}
          >
            {loading ? (
              <LoaderIcon />
            ) : (
              <>
                {optionSelected === "compress" && "Confirm Compress"}
                {optionSelected === "merge" && "Confirm Merge"}
                <Image
                  src={"/assets/icons/pdf-tick-white.svg"}
                  alt="reset-icon"
                  width={20}
                  height={20}
                />
              </>
            )}
          </button>
        </div>
      )}

      {didSucced === true && (
        <div className={styles.rowContent}>
          <button
            onClick={handleReset}
            className={
              optionSelected === "compress" ? "outlined" : "text full-heig"
            }
            disabled={loading}
          >
            {optionSelected === "compress" ? "Reset Compress" : "Reset Merge"}
            <Image
              src={"/assets/icons/pdf-resest-black.svg"}
              alt="reset-icon"
              width={20}
              height={20}
            />
          </button>
          {optionSelected === "compress" ? (
            ""
          ) : (
            <button
              onClick={handleCompress}
              className="outlined"
              disabled={loading}
            >
              {loading ? (
                <LoaderIcon />
              ) : (
                <>
                  Quick Compress
                  <Image
                    src={"/assets/icons/pdf-compress.svg"}
                    alt="reset-icon"
                    width={20}
                    height={20}
                  />
                </>
              )}
            </button>
          )}
        </div>
      )}

      <span className={styles.acceptaceText}>
        By using this platform we assume you accept and understand our{" "}
        <Link
          href={
            "https://nognogs-organization.gitbook.io/nodff-documentation/disclaimer"
          }
          target="_blank"
        >
          Disclaimer
        </Link>{" "}
        and{" "}
        <Link
          href={
            "https://nognogs-organization.gitbook.io/nodff-documentation/privacy-policies-and-terms-and-conditions"
          }
          target="_blank"
        >
          Policies and Term and Conditions
        </Link>
        .
      </span>
    </>
  );
}
