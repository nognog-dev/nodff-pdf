// MAIN IMPORTS
import React from "react";
// COMPONENTS IMPORTS
import Accordion from "./accordion/comoponent";
// STYLES IMPORTS
import styles from "./component.module.scss";

export default function FAQs() {
  const accordionData = [
    {
      title: "How does this work?",
      text:
        "Nodff functions by utilizing straightforward and community-supported libraries to merge PDF files. It is currently in its early stages as a Minimum Viable Product (MVP), constructed with technologies such as NextJS, File-Saver, and Pdf-Lib. Detailed information about the code, design, and components used in this project can be found in our documentation."
    },
    {
      title: "Why is it said that it is 'without limitations'?",
      text:
        "Nodff distinguishes itself by offering users the ability to merge PDF files without constraints. Unlike other websites, there are no restrictions on the size or quantity of PDFs you can merge. This reflects our commitment to providing a flexible and unrestricted PDF merging service."
    },
    {
      title: "What advantages does it have compared to other websites?",
      text:
        "Nodff is continually evolving to offer additional PDF management features in the future. We aim to provide users with a seamless and user-friendly experience when working with PDFs."
    },
    {
      title: "How can I support this website?",
      text:
        "We appreciate your interest in supporting Nodff. In the future, your support and feedback are invaluable to us, to immprove the web, you can do all of this on our donation plataform: https://www.buymeacoffee.com/nognog."
    },
    {
      title: "Is this website secure?",
      text:
        "Nodff's security is ensured by the platform's security policies, such as those provided by the hosting platform (in this case, Vercel). We take security seriously and will continue to implement best practices to protect user data and maintain a safe browsing experience."
    }
  ];

  return (
    <section className={`${styles.sectionContainer}`}>
      <div className={`container-flex`}>
        <div className={` ${styles.sectionContent}`}>
          <h2>Frequently Asked Questions:</h2>
          <div className={`${styles.sectionAccordionContainer}`}>
            {accordionData.map((accordion, index) => (
              <Accordion
                key={index}
                title={accordion.title}
                text={accordion.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
