import React, { Component } from "react";
import PersonalInfoComponent from "./PersonalInfoComponent";
import {
  checkValidity,
  checkFormValidForRequired
} from "../../validations/validateFields";
import errorText from "../../constants/errorText";
import { formRules, formFields } from "./PersonalInfoFormRules";
import AuthService from "../../authentication/AuthService";
import { disableFieldCheck } from "../../util/commonService";
import axiosConfig from "../../util/axiosConfig";
import api from "../../constants/api";

class PersonalInfo extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        fullName: "",
        emailAddress: "",
        mobileNumber: AuthService.getUserInfo().mobile,
        alternateMobile: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        gender: "",
        channelType: "",
        maritalStatus: "",
        remarks: "",
        dateOfBirth: new Date()
      },
      formRules: formRules,
      snackBar: {
        status: false
      },
      validations: {},
      disableFields: true,
      loading: true,
      loadingPost: false
    };
  }

  componentDidMount() {
    this.getPersonalInfo();
  }

  getPersonalInfo = () => {
    const payload = { mobileNumber: AuthService.getUserInfo().mobile };

    axiosConfig({
      method: "post",
      url: api.GET_PERSONAL_INFO,
      data: payload
    })
      .then(response => {
        const { data } = response;
        if (data.userId != null) {
          let disableFields = false;
          disableFields = disableFieldCheck(data.formStatus);

          for (let key in data) {
            if (data[key] == null) {
              data[key] = "";
            }
          }

          this.setState({
            formData: { ...data },
            disableFields,
            loading: false
          });
        } else {
          // If returned false
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

  handleDateChange = (date, id) => {
    const { formData, formRules } = this.state;
    let previousData = formData;
    let previousRules = formRules;
    let validations = previousRules[id].validations;
    const [validity, message] = checkValidity(date, validations);

    previousRules[id].valid = validity;
    previousRules[id].message = message;

    this.setState({
      formData: { ...previousData, [id]: date },
      formRules: {
        ...previousRules
      }
    });
  };

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
      this.postPersonalInfo();
    } else {
      this.errorRequired();
    }
  };

  postPersonalInfo = () => {
    const { formData } = this.state;
    this.setState({ loadingPost: true });
    const payload = {
      fullName: formData.fullName,
      mobileNumber: AuthService.getUserInfo().mobile,
      alternateMobile: formData.alternateMobile,
      emailAddress: formData.emailAddress,
      address: formData.address,
      pincode: formData.pincode,
      city: formData.city,
      state: formData.state,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      channelType: formData.channelType,
      dateOfBirth: formData.dateOfBirth
    };

    axiosConfig({
      method: "post",
      url: api.REGISTER_PERSONAL_INFO,
      data: payload
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

  getPinCodeMaster = pinCode => {
    const payload = { pinCode };
    axiosConfig({
      method: "post",
      url: api.GET_CITY_STATE,
      data: payload
    })
      .then(response => {
        const { data, status } = response;
        if (status === 200 && data !== null) {
          this.setState({
            loading: false,
            city: data.city == null ? "" : data.city,
            state: data.state == null ? "" : data.state
          });
        } else {
          this.pinCodeError(errorText.INVALID_PINCODE);
        }
      })
      .catch(response => {
        // Declare Error
        this.pinCodeError(response.toString());
      });
  };

  pinCodeError = message => {
    const {
      formRules,
      formRules: { pincode }
    } = this.state;
    this.setState({
      snackBar: {
        status: true,
        message,
        severity: "error"
      },
      formRules: {
        ...formRules,
        pincode: {
          ...pincode,
          valid: false
        }
      }
    });
  };

  render() {
    return (
      <div>
        <PersonalInfoComponent
          data={this.state}
          formFields={formFields}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          getPinCodeMaster={this.getPinCodeMaster}
          handleSubmit={this.handleSubmit}
          closeSnackBar={this.closeSnackBar}
        />
      </div>
    );
  }
}

export default PersonalInfo;
