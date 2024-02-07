import { Document, Page } from "react-pdf";
import { useContext } from "react";

import styles from "./component.module.scss";

import { FileContext } from "@/app/layout";

function PdfCompressOptions({ item, loading }) {
  const { levelCompression, setLevelCompression } = useContext(FileContext);

  function formatFileSize(sizeInBytes) {
    let sizeInMB = sizeInBytes / (1024 * 1024);
    if (sizeInMB < 1024) {
      return sizeInMB.toFixed(2) + " MB";
    } else {
      let sizeInGB = sizeInMB / 1024;
      return sizeInGB.toFixed(2) + " GB";
    }
  }

  return (
    <div
      className={styles.pdfInfoCompressContainer}
      style={{ opacity: loading && "0.8", cursor: loading && "not-allowed" }}
    >
      <div className={styles.pdfPreview}>
        <div className={styles.rowContent}>
          <Document file={item.file}>
            <Page pageNumber={1} className="pagePdf" />
          </Document>
          <span>{item.file.name}</span>
        </div>
        <span>{formatFileSize(item.file.size)}</span>
      </div>
      <div className={styles.containerLevelCompress}>
        <div className={styles.infoLevel}>
          <span>Type of Compression</span>
        </div>
        <div className={styles.contentLevelCompress}>
          <button
            disabled={loading}
            className={`outlined ${
              levelCompression === 3 ? "selected-opt" : ""
            }`}
            onClick={() => setLevelCompression(3)}
          >
            Low compression
          </button>
          <button
            disabled={loading}
            className={`outlined ${
              levelCompression === 2 ? "selected-opt" : ""
            }`}
            onClick={() => setLevelCompression(2)}
          >
            Mid compression
          </button>
          <button
            disabled={loading}
            className={`outlined ${
              levelCompression === 1 ? "selected-opt" : ""
            }`}
            onClick={() => setLevelCompression(1)}
          >
            High compresion
          </button>
        </div>
      </div>
    </div>
  );
}

export default PdfCompressOptions;
