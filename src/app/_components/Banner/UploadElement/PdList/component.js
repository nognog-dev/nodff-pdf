import React from "react";
import Image from "next/image";

import styles from "./../component.module.scss";
import Tooltip from "@/app/_components/Tooltip/component";

export const PdfOptionsComponent = ({
  isDeletable,
  setIsDeletableForItem,
  fileOrder,
  handleOrderChange,
  pdfFiles,
  item,
  handleDelete,
  handleCloseDelete,
  isLoading
}) => {
  const handleWantToDeleteForItem = () => {
    setIsDeletableForItem(item.id);
  };
  return (
    <div>
      {isDeletable ? (
        <div className={styles.pdfOptions}>
          <button
            onClick={handleCloseDelete}
            className="ghost icon-button "
            style={{ width: "auto" }}
            disabled={isLoading}
          >
            <Image
              src="/assets/icons/pdf-delete-close.svg"
              alt="pdf-icon"
              width={15}
              height={15}
            />
          </button>
          Are you sure?
          <button
            onClick={() => handleDelete(item.id)}
            className="outlined icon-button red-button"
            style={{ width: "auto" }}
            disabled={isLoading}
          >
            <Image
              src="/assets/icons/pdf-delete-ticket.svg"
              alt="pdf-icon"
              width={15}
              height={15}
            />
          </button>
        </div>
      ) : (
        <div className={styles.pdfOptions}>
          <select
            value={fileOrder[item.id]}
            onChange={e => handleOrderChange(item.id, e.target.value)}
            className={`${styles.customSelect}`}
            disabled={isLoading}
          >
            {pdfFiles.map((_, idx) => (
              <option key={idx} value={idx + 1}>
                {idx + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handleWantToDeleteForItem}
            className="outlined icon-button red-button"
            style={{ width: "auto" }}
            disabled={isLoading}
          >
            <Image
              src="/assets/icons/pdf-delete.svg"
              alt="pdf-view"
              width={20}
              height={20}
            />
          </button>
        </div>
      )}
    </div>
  );
};
