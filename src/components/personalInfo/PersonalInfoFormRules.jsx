import { maritalStatus, gender } from "../../constants/selectMenu";

const formFields = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    autofocus: true
  },
  {
    id: "emailAddress",
    label: "Email Address",
    type: "text"
  },
  {
    id: "mobileNumber",
    label: "Mobile Number",
    inputType: "number",
    onInput: {
      maxLength: 10
    },
    type: "text"
  },
  {
    id: "alternateMobile",
    label: "Alternate Mobile Number",
    inputType: "number",
    onInput: {
      maxLength: 10
    },
    type: "text"
  },
  {
    id: "dateOfBirth",
    label: "Date of Birth",
    type: "date"
  },
  {
    id: "address",
    label: "Address (As per Aadhar card)",
    type: "text",
    multiline: true
  },
  {
    id: "pincode",
    label: "Pin Code",
    inputType: "number",
    onInput: {
      maxLength: 6,
      fetchCity: 6
    },
    type: "text"
  },
  {
    id: "city",
    label: "City",
    type: "text"
  },
  {
    id: "state",
    label: "State",
    type: "text"
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    selectMenu: gender
  },
  {
    id: "maritalStatus",
    label: "Marital Status",
    type: "select",
    selectMenu: maritalStatus
  }
];

const formRules = {
  fullName: {
    validations: {
      required: true
    },
    valid: true
  },
  mobileNumber: {
    validations: {
      required: true,
      mobileNumber: true
    },
    disabled: true,
    valid: true
  },
  alternateMobile: {
    validations: {
      required: true,
      mobileNumber: true
    },
    valid: true
  },
  emailAddress: {
    validations: {
      required: true,
      emailAddress: true
    },
    valid: true
  },
  address: {
    validations: {
      required: true
    },
    valid: true
  },
  pincode: {
    validations: {
      required: true
    },
    valid: true
  },
  city: {
    validations: {
      required: true
    },
    valid: true,
    touched: false,
    disabled: true
  },
  state: {
    validations: {
      required: true
    },
    valid: true,
    touched: false,
    disabled: true
  },
  gender: {
    validations: {
      required: true
    },
    valid: true
  },
  maritalStatus: {
    validations: {
      required: true
    },
    valid: true
  },
  dateOfBirth: {
    validations: {
      dateOfBirthCheck: true
    },
    valid: true
  }
};

export { formRules, formFields };
