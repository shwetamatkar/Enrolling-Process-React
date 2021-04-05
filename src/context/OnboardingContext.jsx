import React from "react";

export default React.createContext({
  mobileNumber: null,
  isVerified: false,
  addMobileNumber: mobileNumber => {},
  setVerification: status => {}
});
