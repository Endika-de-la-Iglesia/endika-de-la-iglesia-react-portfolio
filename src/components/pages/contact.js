import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contactImg from "../../../static/assets/images/auth/materails_methods_photo.png";

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <div
        className="contact-left-side"
        style={{
          background: "url(" + contactImg + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="contact-right-side">
        <div className="phone-number contact-info">
          <div className="icon">
            <FontAwesomeIcon icon="fa-phone" size="2x" />
          </div>
          <div className="text">666 111 222 444</div>
        </div>

        <div className="email contact-info">
          <div className="icon">
            <FontAwesomeIcon icon="fa-envelope" size="2x" />
          </div>
          <div className="text">invented.email@skdlmail.com</div>
        </div>

        <div className="address contact-info">
          <div className="icon">
            <FontAwesomeIcon icon="fa-location-dot" size="2x" />
          </div>
          <div className="text">Spain</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
