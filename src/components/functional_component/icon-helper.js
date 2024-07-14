import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faRightFromBracket,
  faFileImage,
  faFilePen,
  faRightToBracket,
  faSpinner,
  faCirclePlus,
  faPhone,
  faLocationDot,
  faEnvelope,
  faLock
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faTrash,
  faRightFromBracket,
  faFileImage,
  faFilePen,
  faRightToBracket,
  faSpinner,
  faCirclePlus,
  faPhone,
  faLocationDot,
  faEnvelope,
  faLock
);

const IconHelper = () => {
  return library;
};

export default IconHelper;
