import React from "react";
import moment from "moment";
import RegisterComponent from "./RegisterComponent";
import OnboardingContext from "../../context/OnboardingContext";
import paths from "../../constants/paths";
import { validateEmail, isEmpty } from "../../validations/validateFields";
import errorText from "../../constants/errorText";
import constants from "../../constants/constants";
import api from "../../constants/api";
import axiosConfig from "../../util/axiosConfig";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileNumber: "",
      pinCode: "",
      emailAddress: "",
      fullName: "",
      dateOfBirth: new Date(),
      // rmCode: "",
      channelType: "",
      snackBar: {
        status: false
      },
      loadingPost: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = OnboardingContext;

  componentDidMount() {
    this.setState({ mobileNumber: this.context.userDetails.mobileNumber });
  }

  handleDateChange = date => {
    this.setState({ dateOfBirth: date });
  };

  handleChange(event) {
    const { name, value } = event.target;
    const re = /^[0-9\b]+$/;

    if (
      (name === "pinCode" && re.test(value) && value.length <= 6) ||
      value === ""
    ) {
      this.setState({
        [name]: value
      });
      if (name === "pinCode") {
        if (value.length === 6) {
          this.getPinCodeMaster(value);
          // Call PinCode Service
        }
      }
    }

    if (name !== "pinCode") {
      this.setState({
        [name]: value
      });
    }
  }

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
    this.setState({
      snackBar: {
        status: true,
        message,
        severity: "error"
      }
    });
  };

  postRegistrationDetails = () => {
    const payload = {
      fullName: this.state.fullName,
      mobileNumber: this.state.mobileNumber,
      alternateMobile: "",
      emailAddress: this.state.emailAddress,
      address: "",
      pincode: this.state.pinCode,
      city: this.state.city,
      state: this.state.state,
      gender: "",
      maritalStatus: "",
      dateOfBirth: this.state.dateOfBirth,
      // rmCode: this.state.rmCode,
      channelType: this.state.channelType
    };

    this.setState({ loadingPost: true });

    axiosConfig({
      method: "post",
      url: api.REGISTER_PERSONAL_INFO,
      data: payload
    })
      .then(response => {
        if (response.data.status.toUpperCase() === "TRUE") {
          this.setState({ loadingPost: false });
          this.props.history.replace(paths.MY_ACCOUNT);
        } else {
          this.setState({
            loadingPost: false,
            snackBar: {
              status: true,
              message: errorText.INFORMATION_UPDATE_ERROR,
              severity: "error"
            }
          });
          // Error Condition
        }
      })
      .catch(response => {
        this.setState({
          loadingPost: false,
          snackBar: {
            status: true,
            message: response,
            severity: "error"
          }
        });
        // Error Condition
      });
  };

  closeSnackBar = () => {
    this.setState({
      snackBar: {
        status: false
      }
    });
  };

  handleSubmit(event) {
    event.preventDefault();

    const {
      emailAddress,
      fullName,
      pinCode,
      channelType,
      dateOfBirth,
      city
    } = this.state;
    let errorValidation = false;
    let errorEmail = false;
    let helperEmail = "";
    let errorFullName = false;
    let helperFullName = "";
    let errorPinCode = false;
    let helperPinCode = "";
    let errorChannelType = false;
    let helperChannelType = "";
    let errorDateOfBirth = false;
    let helperDateOfBirth = "";

    // Email address validation
    if (!validateEmail(emailAddress)) {
      errorValidation = true;
      errorEmail = true;
      helperEmail = errorText.INVALID_EMAIL_ADDRESS;
    }

    if (isEmpty(fullName)) {
      errorValidation = true;
      errorFullName = true;
      helperFullName = errorText.INVALID_NAME;
    }

    if (isEmpty(pinCode)) {
      errorValidation = true;
      errorPinCode = true;
      helperPinCode = errorText.INVALID_PINCODE;
    }

    if (isEmpty(city)) {
      errorValidation = true;
      errorPinCode = true;
      helperPinCode = errorText.INVALID_PINCODE;
    }

    var years = moment().diff(dateOfBirth, "years", false);
    if (!(years >= constants.age.minAge && years < constants.age.maxAge)) {
      errorValidation = true;
      errorDateOfBirth = true;
      helperDateOfBirth = errorText.INVALID_DATE_OF_BIRTH;
    }

    // if (isEmpty(rmCode)) {
    //   errorValidation = true;
    //   errorRmCode = true;
    //   helperRmCode = errorText.INVALID_RMCODE;
    // }

    if (isEmpty(channelType)) {
      errorValidation = true;
      errorChannelType = true;
      helperChannelType = errorText.INVALID_CHANNELTYPE;
    }

    this.setState({
      errorEmail,
      helperEmail,
      errorFullName,
      helperFullName,
      errorPinCode,
      helperPinCode,
      // errorRmCode,
      // helperRmCode,
      errorChannelType,
      helperChannelType,
      errorDateOfBirth,
      helperDateOfBirth
    });

    if (errorValidation === false) {
      this.postRegistrationDetails();
    }
  }

  render() {
    return (
      <RegisterComponent
        data={this.state}
        handleChange={this.handleChange}
        handleDateChange={this.handleDateChange}
        handleSubmit={this.handleSubmit}
        closeSnackBar={this.closeSnackBar}
      />
    );
  }
}

export default Register;
