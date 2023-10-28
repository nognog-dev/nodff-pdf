// MAIN IMPORTS
"use client";
import React from "react";

// NEXT COMPONENTS
import Image from "next/image";
import Link from "next/link";
// STYLES IMPORTED
import styles from "./component.module.scss";
import Tooltip from "../../Tooltip/component";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={`container-flex ${styles.headerContent}`}>
        <div className={styles.headerLogoOptions}>
          <Image
            src={"/nodff-icon.svg"}
            alt="logo-app"
            width={100}
            height={100}
          />
          <div className={styles.headerOptionsContent}>
            <Tooltip tooltipText="On maintenance">
              <Link className={styles.tabOption} href={"/#"}>
                Documentation
              </Link>
            </Tooltip>
            <Tooltip tooltipText="On maintenance">
              <Link className={styles.tabOption} href={"/#"}>
                Support
              </Link>
            </Tooltip>
          </div>
        </div>
        <div className={styles.headerMoreOptionsContent}>
          {/* LIGHT AND ENGLISH MODE */}
        </div>
      </div>
    </header>
  );
}
