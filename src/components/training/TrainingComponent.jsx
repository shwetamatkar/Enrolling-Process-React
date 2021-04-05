import React from "react";
import { PdfReader } from "../pdfreader/PdfReader";

const DocumentFile = require("../../resources/POS_Content_V1.pdf");

function TrainingComponent(props) {
  return <PdfReader DocumentFile={DocumentFile} />;
}

export default TrainingComponent;
