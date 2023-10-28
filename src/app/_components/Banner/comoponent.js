// MAIN IMPORTS
import React from "react";
// STYLES IMPORTED
import styles from "./component.module.scss";
import UploadComponent from "./UploadElement/comoponent";

export default function BannerAction() {
  return (
    <section className={`${styles.sectionContainer}`}>
      <div className={`container-flex ${styles.sectionContent}`}>
        <div className={` ${styles.sectionInfo}`}>
          <h1>
            Merge your PDF’s <u>without</u> limitations.
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
          >
            <option value="option1">Merge</option>
            <option value="option2" disabled>
              Edit // Coming
            </option>
            <option value="option3" disabled>
              Compress // Coming
            </option>
          </select>
          <UploadComponent />
        </div>
      </div>
    </section>
  );
}
