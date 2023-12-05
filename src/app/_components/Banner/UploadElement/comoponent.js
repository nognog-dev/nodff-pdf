"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Loading from "../../Loading/comoponent";
import { pdfMergeNODFF } from "@/app/_utils/pdfUtils";
import styles from "./component.module.scss";

const getInitialOrder = files =>
  files.reduce((acc, file, index) => {
    acc[file.id] = index + 1;
    return acc;
  }, {});

export default function UploadComponent() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [fileOrder, setFileOrder] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFileChange = useCallback(event => {
    const newFiles = Array.from(event.target.files).map((file, index) => ({
      file,
      id: index
    }));

    setPdfFiles(newFiles);
    setFileOrder(getInitialOrder(newFiles));
  }, []);

  const handleReset = useCallback(() => {
    setPdfFiles([]);
  }, []);

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

  const handleMerge = useCallback(() => {
    const orderedFiles = Object.entries(fileOrder)
      .sort((a, b) => a[1] - b[1])
      .map(([id]) => pdfFiles.find(file => file.id.toString() === id).file);
    pdfMergeNODFF(orderedFiles, setLoading, setPdfFiles);
  }, [pdfFiles, fileOrder]);

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
        return newOrder;
      });
    },
    [fileOrder]
  );

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
          {loading ? (
            <Loading />
          ) : pdfFiles.length > 0 ? (
            <div className={styles.containerList}>
              {pdfFiles.map(item => (
                <div key={item.id} className={styles.fileInfo}>
                  <div className={styles.pdfPreview}>
                    <Image
                      src={"/assets/icons/pdf-view.svg"}
                      alt="pdf-view"
                      width={50}
                      height={50}
                    />
                    <span>{item.file.name}</span>
                  </div>
                  <div className={styles.pdfOptions}>
                    <select
                      value={fileOrder[item.id]}
                      onChange={e => handleOrderChange(item.id, e.target.value)}
                      className={`${styles.customSelect}`}
                    >
                      {pdfFiles.map((_, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="outlined icon-button red-button"
                      style={{ width: "auto" }}
                    >
                      <Image
                        src={"/assets/icons/pdf-delete.svg"}
                        alt="pdf-view"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
            style={{ display: pdfFiles.length > 0 ? "none" : "" }}
          />
        </div>
      </div>
      {!loading && pdfFiles.length > 0 && (
        <div className={styles.rowContent}>
          <button onClick={handleReset} className="outlined">
            Reset Merge
          </button>
          <button onClick={handleMerge} className="filled">
            Confirm Merge
          </button>
        </div>
      )}
    </>
  );
}
