import React from "react";
import cm from "./Contact.module.css";

const Contact = React.memo(({ contactTitle, contactValue }) => {
  return (
    <div>
      <div className={cm.descriptionContact}>
        <b>{contactTitle}</b>: {contactValue}
      </div>
    </div>
  );
});

export default Contact;
