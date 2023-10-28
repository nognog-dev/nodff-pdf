// MAIN IMPORTS
'use client';
import React, { useState } from "react";
// NEXT IMPORTS
import Image from "next/image";
// STYLES IMPORTS
import styles from "./component.module.scss";

export default function Accordion({ title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.accordionContainer}`}>
      <div className={`${styles.accordionTopContent}`} onClick={toggleAccordion}>
        <p className={`${styles.accordionTitle}`}>{title}</p>
        <Image  src={"/down-icon.svg"} height={25} width={25} alt="down-icon" />
      </div>
      {isOpen && (
        <div className={`${styles.accordionInfoContent}`}>
          <hr />
          <span>{text}</span>
        </div>
      )}
    </div>
  );
}
