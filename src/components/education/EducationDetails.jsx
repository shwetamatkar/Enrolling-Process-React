import React, { Component } from "react";
import EducationDetailsComponent from "./EducationDetailsComponent";
import { formRules, formFields } from "./EducationFormRules";
import errorText from "../../constants/errorText";
import {
  validateFile,
  checkValidity,
  checkFormValidForRequired
} from "../../validations/validateFields";
import { disableFieldCheck } from "../../util/commonService";
import { generateFileName } from "../../util/fileService";
import AuthService from "../../authentication/AuthService";
import axiosConfig from "../../util/axiosConfig";
import api from "../../constants/api";

class EducationDetails extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        qualification: "",
        rollNumber: "",
        yearOfPassing: "",
        certificatePath: "",
        remarks: ""
      },
      formRules: formRules,
      documentFile: null,
      snackBar: {
        status: false
      },
      loading: true,
      loadingPost: false,
      validations: {},
      disableFields: true
    };
  }

  componentDidMount() {
    this.getEducationDetails();
  }

  handleChange = event => {
    const { formData, formRules } = this.state;
    const { name, value } = event.target;
    let previousData = formData;
    let previousRules = formRules;
    let validations = previousRules[name].validations;

    const [validity, message] = checkValidity(value, validations);

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

    let certificatePath =
      event.target.files[0] != null ? event.target.files[0].name : null;

    const [validity, message] = checkValidity(certificatePath, validations);

    previousRules[id].valid = validity;
    previousRules[id].message = message;

    this.setState({
      documentFile: event.target.files[0],
      formData: {
        ...previousData,
        certificatePath
      }
    });
    //}
    // else {
    //   alert("Please upload a valid file");
    // }
  };

  getEducationDetails = () => {
    axiosConfig({
      method: "get",
      url: api.GET_EDUCATION_DETAILS
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
              qualification:
                data.qualification == null ? "" : data.qualification,
              rollNumber: data.rollNumber == null ? "" : data.rollNumber,
              yearOfPassing:
                data.yearOfPassing == null ? "" : data.yearOfPassing,
              certificatePath:
                data.certificatePath == null ? "" : "File Uploaded",
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

  postEducationDetails = () => {
    const {
      formData: { qualification, rollNumber, yearOfPassing },
      documentFile
    } = this.state;

    this.setState({ loadingPost: true });

    const fd = new FormData();

    if (documentFile != null) {
      const newFileName = generateFileName(documentFile, "_EDUCATION_");
      fd.append("educationDocument", documentFile, newFileName);
    }
    fd.append("mobileNumber", AuthService.getUserInfo().mobile);
    fd.append("rollNumber", rollNumber);
    fd.append("yearOfPassing", yearOfPassing);
    fd.append("eduQua", qualification);

    axiosConfig({
      method: "post",
      url: api.POST_EDUCATION_DETAILS,
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
      this.postEducationDetails();
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
        <EducationDetailsComponent
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

export default EducationDetails;
