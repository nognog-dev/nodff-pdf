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
        "Nodff functions by utilizing straightforward and community-supported libraries to merge and compress PDF files. It is currently in its early stages as a Minimum Viable Product (MVP), constructed with technologies such as NextJS, File-Saver, ghostscript and Pdf-Lib. Detailed information about the code, design, and components used in this project can be found in our documentation (at the header)."
    },
    {
      title: "Why is it said that it is 'without limitations'?",
      text:
        "Nodff distinguishes itself by offering users the ability to merge and compress PDF files without constraints. Unlike other websites, there are no restrictions on the size or quantity of PDFs you can merge or compress. This reflects our commitment to providing a flexible and unrestricted PDF tool."
    },
    {
      title: "What advantages does it have compared to other websites?",
      text:
        "Nodff is continually evolving to offer additional PDF management features in the future. We aim to provide users with a seamless and user-friendly experience when working with PDFs and expand to any kind of file, always being open-source."
    },
    {
      title: "Is this website secure?",
      text:
        "Nodff's security is ensured by the platform's security policies (visit our documentation to read them), such as those provided by the hosting platform (in this case, Vercel). We take security seriously and at no time do we save or use any type of user information, this platform works as a receiver of open source protocols from other libraries to change the result. We clarify that we do not save or have the possibility of being able to store any entered files, we invite you to review our documentation page that explains how we make this possible. We will continue to implement best practices to protect user data and maintain a safe browsing experience."
    },
    {
      title: "How can I support this website?",
      text:
        "We appreciate your interest in supporting Nodff. In the future, your support and feedback are invaluable to us, to immprove the web, you can do all of this on our donation plataform: https://www.buymeacoffee.com/nognog. Feel free to vist our documenation to find more information about the devs and team behind"
    },
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
