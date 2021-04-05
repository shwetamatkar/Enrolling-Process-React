const formFields = [
  {
    id: "panCardNo",
    label: "Pan Card",
    inputType: "password",
    type: "text"
  },
  {
    id: "panCardNo_Re",
    label: "Re-enter Pan Card",
    type: "text"
  },
  {
    id: "adhaarNo",
    label: "Aadhar Card",
    type: "text",
    inputType: "password",
    onInput: {
      maxLength: 12
    }
  },
  {
    id: "adhaarNo_Re",
    label: "Re-enter Aadhar Card",
    type: "text",
    inputType: "number",
    onInput: {
      maxLength: 12
    }
  },
  {
    id: "panCardPath",
    label: "Upload Pan Card*",
    type: "file"
  },
  {
    id: "adhaarCardPath",
    label: "Upload Aadhar Font*",
    type: "file"
  },
  {
    id: "adhaarCardPathb",
    label: "Upload Aadhar Card Back*",
    type: "file"
  },
  {
    id: "addressProofPath",
    label: "Proof of Address*",
    type: "file"
  },
  {
    id: "identityProofPath",
    label: "Proof of Identity in case of name change",
    type: "file"
  },
  {
    id: "profileImage",
    label: "Profile Image*",
    type: "file"
  }
];

const formRules = {
  panCardNo: {
    validations: {
      required: true,
      panCard: true
    },
    valid: true
  },
  panCardNo_Re: {
    validations: {
      required: true,
      doubleVerification: true,
      doubleVerificationWith: "panCardNo"
    },
    valid: true
  },
  adhaarNo: {
    validations: {
      required: true,
      aadharCard: true
    },
    valid: true
  },
  adhaarNo_Re: {
    validations: {
      required: true,
      doubleVerification: true,
      doubleVerificationWith: "adhaarNo"
    },
    valid: true
  },
  panCardPath: {
    validations: {
      required: true
    },
    valid: true
  },
  adhaarCardPath: {
    validations: {
      required: true
    },
    valid: true
  },
  adhaarCardPathb: {
    validations: {
      required: true
    },
    valid: true
  },
  addressProofPath: {
    validations: {
      required: true
    },
    valid: true
  },
  identityProofPath: {
    validations: {},
    valid: true
  },
  profileImage: {
    validations: {
      required: true
    },
    valid: true
  }
};

export { formRules, formFields };
