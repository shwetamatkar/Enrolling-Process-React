import { bankProof } from "../../constants/selectMenu";

const formFields = [
  {
    id: "bankName",
    label: "Bank Name",
    type: "text",
    autofocus: true
  },
  {
    id: "holderName",
    label: "Account Holder Name",
    type: "text"
  },
  {
    id: "accountNumber",
    label: "Account Number",
    type: "text",
    inputType: "password"
  },
  {
    id: "accountNumber_Re",
    label: "Re-enter Account Number",
    type: "text"
  },
  {
    id: "ifscCode",
    label: "IFSC",
    inputType: "password",
    type: "text",
    onInput: {
      maxLength: 11
    }
  },
  {
    id: "ifscCode_Re",
    label: "Re-enter IFSC",
    type: "text",
    onInput: {
      maxLength: 11
    }
  },
  {
    id: "documentUploaded",
    label: "Bank Proof",
    type: "select",
    selectMenu: bankProof
  },
  {
    id: "documentPath",
    label: "Bank Proof Document",
    type: "file"
  }
];

const formRules = {
  bankName: {
    validations: {
      required: true
    },
    valid: true
  },
  holderName: {
    validations: {
      required: true
    },
    valid: true
  },
  accountNumber: {
    validations: {
      required: true
    },
    valid: true
  },
  accountNumber_Re: {
    validations: {
      required: true,
      doubleVerification: true,
      doubleVerificationWith: "accountNumber"
    },
    valid: true
  },
  ifscCode: {
    validations: {
      required: true,
      ifsc: true
    },
    valid: true
  },
  ifscCode_Re: {
    validations: {
      required: true,
      doubleVerification: true,
      doubleVerificationWith: "ifscCode"
    },
    valid: true
  },
  documentUploaded: {
    validations: {
      required: true
    },
    valid: true
  },
  documentPath: {
    validations: {
      required: true
    },
    valid: true
  }
};

export { formRules, formFields };
