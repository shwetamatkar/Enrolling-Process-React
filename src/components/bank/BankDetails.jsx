import React, { Component } from "react";
import BankDetailsComponent from "./BankDetailsComponent";
import {
  checkValidity,
  checkFormValidForRequired
} from "../../validations/validateFields";
import errorText from "../../constants/errorText";
import { disableFieldCheck } from "../../util/commonService";
import axiosConfig from "../../util/axiosConfig";
import api from "../../constants/api";
import AuthService from "../../authentication/AuthService";
import { generateFileName } from "../../util/fileService";
import { formRules, formFields } from "./BankDetailsFormRules";

class BankDetails extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        bankName: "",
        holderName: "",
        accountNumber: "",
        accountNumber_Re: "",
        ifscCode: "",
        ifscCode_Re: "",
        documentUploaded: "",
        documentPath: "",
        remarks: ""
      },
      formRules: formRules,
      documentFile: null,
      validations: {},
      snackBar: {
        status: false
      },
      disableFields: true,
      loading: true,
      loadingPost: false
    };
  }

  componentDidMount() {
    this.getBankDetails();
  }

  handleChange = event => {
    const { formData, formRules } = this.state;
    const { name, value } = event.target;
    let previousData = formData;
    let previousRules = formRules;
    let validations = previousRules[name].validations;

    const [validity, message] = checkValidity(
      value,
      validations,
      formData[validations.doubleVerificationWith]
    );

    previousRules[name].valid = validity;
    previousRules[name].message = message;

    this.setState({
      formData: { ...previousData, [name]: value.toUpperCase() },
      formRules: {
        ...previousRules
      }
    });
  };

  fileSelectedHandler = event => {
    const { formData, formRules } = this.state;
    const { id } = event.target;
    let previousData = formData;
    let previousRules = formRules;
    let validations = previousRules[id].validations;

    let documentPath =
      event.target.files[0] != null ? event.target.files[0].name : null;

    const [validity, message] = checkValidity(documentPath, validations);

    previousRules[id].valid = validity;
    previousRules[id].message = message;

    this.setState({
      documentFile: event.target.files[0],
      formData: {
        ...previousData,
        documentPath
      }
    });
    //}
    // else {
    //   alert("Please upload a valid file");
    // }
  };

  getBankDetails = () => {
    axiosConfig({
      method: "get",
      url: api.GET_BANK_DETAILS
    })
      .then(response => {
        const { data, status } = response;
        if (status === 200 && data.formStatus != null) {
          let disableFields = false;
          disableFields = disableFieldCheck(data.formStatus);

          this.setState({
            disableFields,
            loading: false,
            formData: {
              bankName: data.bankName == null ? "" : data.bankName,
              holderName: data.holderName == null ? "" : data.holderName,
              accountNumber:
                data.accountNumber == null ? "" : data.accountNumber,
              accountNumber_Re:
                data.accountNumber == null ? "" : data.accountNumber,
              ifscCode: data.ifscCode == null ? "" : data.ifscCode,
              ifscCode_Re: data.ifscCode == null ? "" : data.ifscCode,
              documentUploaded:
                data.documentUploaded == null ? "" : data.documentUploaded,
              documentPath: data.documentPath == null ? "" : "File Uploaded",
              remarks: data.remarks == null ? "" : data.remarks
            }
          });
        } else if (status === 204) {
          this.setState({
            disableFields: false,
            loading: false
          });
        } else {
          this.disableFields(errorText.ERROR_INFORMATION_FETCH);
        }
      })
      .catch(response => {
        // Declare Error
        this.disableFields(response.toString());
      });
  };

  disableFields = message => {
    this.setState({
      snackBar: {
        status: true,
        message,
        severity: "error"
      }
    });
    this.setState({ disableFields: true, loading: false });
  };

  postBankDetails = () => {
    const {
      formData: {
        bankName,
        holderName,
        accountNumber,
        ifscCode,
        documentUploaded
      },
      documentFile
    } = this.state;

    this.setState({
      loadingPost: true
    });

    const fd = new FormData();
    if (documentFile != null) {
      const newFileName = generateFileName(documentFile, "_BANK_");
      fd.append("bankDocument", documentFile, newFileName);
    }
    fd.append("mobileNumber", AuthService.getUserInfo().mobile);
    fd.append("bankName", bankName);
    fd.append("holderName", holderName);
    fd.append("accountNumber", accountNumber);
    fd.append("ifscCode", ifscCode);
    fd.append("documentUploaded", documentUploaded);

    axiosConfig({
      method: "post",
      url: api.POST_BANK_DETAILS,
      data: fd
    })
      .then(response => {
        if (response.data.status.toUpperCase() === "TRUE") {
          this.setState({
            snackBar: {
              status: true,
              message: errorText.INFORMATION_UPDATE_SUCCESS,
              severity: "success"
            },
            loadingPost: false
          });
        } else {
          this.setState({
            snackBar: {
              status: true,
              message: errorText.INFORMATION_UPDATE_ERROR,
              severity: "error"
            },
            loadingPost: false
          });
          // Error Condition
        }
      })
      .catch(() => {
        this.setState({
          snackBar: {
            status: true,
            message: errorText.INFORMATION_UPDATE_ERROR,
            severity: "error"
          },
          loadingPost: false
        });
        // Error Condition
      });

    // API Call
  };

  errorRequired = () => {
    const { formRules, formData } = this.state;

    for (let key in formRules) {
      if (
        formRules[key].validations.required &&
        (formData[key] == null || formData[key] === "")
      ) {
        formRules[key].valid = false;
      }
    }

    this.setState({
      formRules
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { formRules, formData } = this.state;

    if (checkFormValidForRequired(formRules, formData)) {
      this.postBankDetails();
    } else {
      this.errorRequired();
    }
  };

  closeSnackBar = () => {
    this.setState({
      snackBar: {
        status: false
      }
    });
  };

  render() {
    return (
      <div>
        <BankDetailsComponent
          data={this.state}
          formFields={formFields}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          closeSnackBar={this.closeSnackBar}
          fileSelectedHandler={this.fileSelectedHandler}
        />
      </div>
    );
  }
}

export default BankDetails;
