"use client";
// MAIN IMPORTS
import { useContext } from "react";
import { FileContext } from "../../layout";
import UploadComponent from "./UploadElement/comoponent";
// STYLES IMPORTED
import styles from "./component.module.scss";

export default function BannerAction() {
  const { optionSelected, setOptionSelected } = useContext(FileContext);

  const handleSelectChange = event => {
    setOptionSelected(event.target.value);
  };

  return (
    <section className={`${styles.sectionContainer}`}>
      <div className={`container-flex ${styles.sectionContent}`}>
        <div className={` ${styles.sectionInfo}`}>
          <h1>
            Merge and Compress your PDF’s <u>without</u> limitations.
          </h1>
          <h3>
            Nodff provides you with the opportunity to merge all your PDFs
            without any size, quantity, or limitations compared to other
            websites.
          </h3>
        </div>
        <div className={`${styles.sectionActions}`}>
          <select
            placeholder="Select an action"
            className={`${styles.customSelect}`}
            onChange={handleSelectChange}
            value={optionSelected}
          >
            <option value="merge">Merge PDF</option>
            <option value="compress">Compress PDF</option>
            <option value="edit" disabled>
              Edit // Coming
            </option>
          </select>
          <UploadComponent />
        </div>
      </div>
    </section>
  );
}
