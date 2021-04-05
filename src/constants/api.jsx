const api = {
  AUTH: "authenticate",
  SEND_OTP: "auth/sendotp",
  VALIDATE_OTP: "auth/validateotp",
  CHECK_REGISTRATION: "login/checkregistration",
  CHECK_STATUS: "login/checkstatus",
  GET_PERSONAL_INFO: "personalinfo/getpersonalinfo",
  REGISTER_PERSONAL_INFO: "personalinfo/update",
  GET_EDUCATION_DETAILS: "educationdtls/geteducationinfo",
  POST_EDUCATION_DETAILS: "educationdtls/upload",
  POST_BANK_DETAILS: "bankdetails/upload",
  GET_BANK_DETAILS: "bankdetails/getbankinfo",
  POST_BUSINESS_INFO: "businessinfo/update",
  GET_BUSINESS_INFO: "businessinfo/getbusinessinfo",
  POST_DOCUMENT_UPLOAD: "/docupload/upload",
  GET_DOCUMENT_UPLOAD: "/docupload/getdocinfo",
  GET_CITY_STATE: "/getstateandcity",
  POST_SUBMIT_FORM: "/submitcompleteform/submit"
};

export default api;
