import React, { FC } from "react";
import cm from "./Contact.module.css";

type ContactT = {
  contactTitle: string
  contactValue: string
}

const Contact: FC<ContactT> = React.memo(({ contactTitle, contactValue }) => {
  return (
    <div>
      <div className={cm.descriptionContact}>
        <b>{contactTitle}</b>: {contactValue}
      </div>
    </div>
  );
});

export default Contact;
