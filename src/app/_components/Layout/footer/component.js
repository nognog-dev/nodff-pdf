// MAIN IMPORTS
import React from "react";
// NEXT COMPONENTS
import Link from "next/link";
// STYLES IMPORTED
import styles from "./component.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={`container-flex ${styles.footerContent}`}>
        <span className={styles.textFooter}>
          Created and Designed by{" "}
          <Link href={"https://linktr.ee/nognog.studio"}>
            <u>NOGNOG</u>
          </Link>
        </span>
      </div>
    </footer>
  );
}
