import React, { Component } from "react";
import DocumentUploadComponent from "./DocumentUploadComponent";
import {
  validatePAN,
  isEmpty,
  validateAadhar,
  checkValidity,
  checkFormValidForRequired
} from "../../validations/validateFields";
import { formRules, formFields } from "./DocumentUploadFormRules";
import errorText from "../../constants/errorText";
import { disableFieldCheck } from "../../util/commonService";
import axiosConfig from "../../util/axiosConfig";
import api from "../../constants/api";
import { generateFileName } from "../../util/fileService";

class DocumentUpload extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        panCardNo: "",
        panCardNo_Re: "",
        adhaarNo: "",
        adhaarNo_Re: "",
        remarks: ""
      },
      formRules: formRules,
      fileHelper: {},
      validations: {},
      disableFields: true,
      snackBar: {
        status: false
      },
      loading: true,
      loadingPost: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getDocumentUpload();
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

  // fileSelectedHandler = event => {
  //   const { id, files } = event.target;

  //   this.setState({
  //     [id + "File"]: files[0],
  //     [id + "Name"]: files[0] != null ? files[0].name : ""
  //   });
  // };

  fileSelectedHandler = event => {
    const { formData, formRules } = this.state;
    const { id, files } = event.target;
    let previousData = formData;
    let previousRules = formRules;
    let validations = previousRules[id].validations;

    let documentPath =
      event.target.files[0] != null ? event.target.files[0].name : null;

    const [validity, message] = checkValidity(documentPath, validations);

    previousRules[id].valid = validity;
    previousRules[id].message = message;

    this.setState({
      [id + "File"]: files[0],
      formData: {
        ...previousData,
        [id]: files[0] != null ? files[0].name : ""
      }
    });
    //}
    // else {
    //   alert("Please upload a valid file");
    // }
  };

  getDocumentUpload = () => {
    axiosConfig({
      method: "get",
      url: api.GET_DOCUMENT_UPLOAD
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
              panCardNo: data.panCardNo == null ? "" : data.panCardNo,
              adhaarNo: data.adhaarNo == null ? "" : data.adhaarNo,
              panCardNo_Re: data.panCardNo == null ? "" : data.panCardNo,
              adhaarNo_Re: data.adhaarNo == null ? "" : data.adhaarNo,
              panCardPath:
                data.panCardPath === (null || "N/A") ? "" : "File Uploaded",
              adhaarCardPath:
                data.adhaarCardPath === (null || "N/A") ? "" : "File Uploaded",
              adhaarCardPathb:
                data.adhaarCardPathb === (null || "N/A") ? "" : "File Uploaded",
              addressProofPath:
                data.addressProofPath === (null || "N/A")
                  ? ""
                  : "File Uploaded",
              identityProofPath:
                data.identityProofPath === (null || "N/A")
                  ? ""
                  : "File Uploaded",
              profileImage:
                data.profileImage === (null || "N/A") ? "" : "File Uploaded",
              remarks: data.remarks == null ? "" : data.remarks
            }
          });
        } else if (status === 204) {
          this.setState({
            disableFields: false,
            loading: false
          });
        } else {
          // For False Response
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

  postDocumentUpload = () => {
    // change Variable Names
    const {
      formData: { panCardNo, adhaarNo },
      panCardPathFile,
      adhaarCardPathFile,
      adhaarCardPathbFile,
      addressProofPathFile,
      identityProofPathFile,
      profileImageFile
    } = this.state;

    this.setState({ loadingPost: true });

    const fd = new FormData();

    fd.append("adhaarNo", adhaarNo);
    fd.append("panCardNo", panCardNo);
    fd.append("addressProof", ""); //

    if (panCardPathFile != null) {
      fd.append(
        "panCard",
        panCardPathFile,
        generateFileName(panCardPathFile, "_PAN_")
      );
    }

    if (adhaarCardPathFile != null) {
      fd.append(
        "adharCardF",
        adhaarCardPathFile,
        generateFileName(adhaarCardPathFile, "_AADHARF_")
      );
    }
    if (adhaarCardPathbFile != null) {
      fd.append(
        "adharCardB",
        adhaarCardPathbFile,
        generateFileName(adhaarCardPathbFile, "_AADHARB_")
      );
    }

    if (addressProofPathFile != null) {
      fd.append(
        "addressProofDoc",
        addressProofPathFile,
        generateFileName(addressProofPathFile, "_ADDRESS_")
      );
    }

    if (identityProofPathFile != null) {
      fd.append(
        "identityProofDoc",
        identityProofPathFile,
        generateFileName(identityProofPathFile, "_IDENTITY_")
      );
    }

    if (profileImageFile != null) {
      fd.append(
        "profilePhoto",
        profileImageFile,
        generateFileName(profileImageFile, "_PROFILE_")
      );
    }

    axiosConfig({
      method: "post",
      url: api.POST_DOCUMENT_UPLOAD,
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

  closeSnackBar = () => {
    this.setState({
      snackBar: {
        status: false
      }
    });
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
      this.postDocumentUpload();
    } else {
      this.errorRequired();
    }
  };

  validateField() {
    const {
      panCard,
      panCard_Re,
      aadharCard,
      aadharCard_Re,
      // addressProof,
      panCardFileName,
      aadharFrontFileName,
      aadharBackFileName,
      addressProofFileName,
      profileImgFileName
    } = this.state;
    let errorValidation = false;

    let errorPanCard = false;
    let helperPanCard = "";
    let errorAadharCard = false;
    let helperAadharCard = "";
    // let errorAddressProof = false;
    // let helperAddressProof = "";
    let fileHelper = {};

    const filesCheck = [
      {
        id: "panCardFile",
        name: panCardFileName
      },
      {
        id: "aadharFrontFile",
        name: aadharFrontFileName
      },
      {
        id: "aadharBackFile",
        name: aadharBackFileName
      },
      {
        id: "addressProofFile",
        name: addressProofFileName
      },
      {
        id: "profileImgFile",
        name: profileImgFileName
      }
    ];

    if (!validatePAN(panCard) || panCard !== panCard_Re) {
      errorValidation = true;
      errorPanCard = true;
      helperPanCard = errorText.INVALID_PANCARD;
    }

    // if (isEmpty(addressProof)) {
    //   errorValidation = true;
    //   errorAddressProof = true;
    //   helperAddressProof = errorText.INVALID_ADDRESS_PROOF;
    // }

    if (!validateAadhar(aadharCard) || aadharCard !== aadharCard_Re) {
      errorValidation = true;
      errorAadharCard = true;
      helperAadharCard = errorText.INVALID_AADHAR_CARD;
    }

    for (let i = 0; i < filesCheck.length; i++) {
      let id = filesCheck[i].id;
      if (isEmpty(filesCheck[i].name)) {
        errorValidation = true;
        fileHelper[id] = errorText.EMPTY_FILE;
      } else {
        fileHelper[id] = "";
      }
    }

    this.setState({
      validations: {
        errorPanCard,
        helperPanCard,
        errorAadharCard,
        helperAadharCard
        // errorAddressProof,
        // helperAddressProof
      },
      fileHelper
    });

    return errorValidation;
  }

  render() {
    return (
      <div>
        <DocumentUploadComponent
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

export default DocumentUpload;
