import { educationQualification } from "../../constants/selectMenu";

const formFields = [
  {
    id: "qualification",
    label: "Education",
    type: "select",
    selectMenu: educationQualification,
    autofocus: true
  },
  {
    id: "rollNumber",
    label: "Roll Number",
    type: "text"
  },
  {
    id: "yearOfPassing",
    label: "Year of Passing",
    inputType: "number",
    onInput: {
      maxLength: 4
    },
    type: "text"
  },
  {
    id: "certificatePath",
    label: "Education Proof Document",
    type: "file"
  }
];

const formRules = {
  qualification: {
    validations: {
      required: true
    },
    valid: true
  },
  rollNumber: {
    validations: {
      required: true
    },
    valid: true
  },
  yearOfPassing: {
    validations: {
      required: true
    },
    valid: true
  },
  certificatePath: {
    validations: {
      required: true
    },
    valid: true
  }
};

export { formRules, formFields };
