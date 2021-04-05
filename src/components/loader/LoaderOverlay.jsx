import React from "react";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function LoaderOverlay({ active, text, children }) {
  return (
    <LoadingOverlay
      active={active}
      text={text}
      spinner={<ClimbingBoxLoader color="#fff" />}
    >
      {children}
    </LoadingOverlay>
  );
}
