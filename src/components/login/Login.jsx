import React from "react";
import LoginComponent from "./LoginComponent";
import OnboardingContext from "../../context/OnboardingContext";
import paths from "../../constants/paths";
import { validateMobile } from "../../validations/validateFields";
import errorText from "../../constants/errorText";
import LoginService from "./LoginService";
import AuthService from "../../authentication/AuthService";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileNumber: "",
      otpBlock: false,
      buttonText: "SEND OTP",
      otp: "",
      otpTimer: 0,
      resendDisabled: true,
      resendTimer: 100,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextType = OnboardingContext;

  componentDidMount() {
    if (AuthService.checkAuthenticated()) {
      this.props.history.push(paths.MY_ACCOUNT);
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    let textLength = 10;
    if (name === "mobileNumber") {
      textLength = 10;
    } else if (name === "otp") {
      textLength = 6;
    }

    const re = /^[0-9\b]+$/;
    if (value === "" || (re.test(value) && value.length <= textLength)) {
      this.setState({
        [name]: value
      });
    }
  }

  sendOTP = () => {
    const credentials = { mobileNumber: this.state.mobileNumber };
    this.setState({ loading: true, buttonText: "SENDING OTP..." });

    LoginService.sendOTP(credentials)
      .then(response => {
        if (response.data.status.toUpperCase() === "TRUE") {
          this.setState({
            otpBlock: true,
            buttonText: "VALIDATE",
            helperTextMobile: "",
            errorMobile: false,
            resendDisabled: true,
            resendTimer: 100,
            loading: false
          });
          this.intervalId = setInterval(this.resendTimer, 600);
        } else {
          this.setState({
            otpBlock: false,
            buttonText: "SEND OTP",
            helperTextMobile: errorText.OTP_SERVICE_ERROR,
            errorMobile: true,
            loading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          otpBlock: false,
          buttonText: "SEND OTP",
          helperTextMobile: errorText.OTP_SERVICE_ERROR,
          errorMobile: true,
          loading: false
        });
      });
  };

  validateOTP = otp => {
    const credentials = { otp: otp };
    this.setState({
      loading: true
    });
    LoginService.login(credentials)
      .then(response => {
        if (response.data.status === "TRUE") {
          // this.context.setVerification(true);
          LoginService.setSession(response.headers.token);
          this.props.history.replace({
            pathname: paths.LOGIN_REDIRECT,
            state: { mobileNumber: this.state.mobileNumber }
          });
        } else {
          // this.context.setVerification(false);
          this.setState({
            helperOTP: errorText.INVALID_OTP,
            errorOTP: true,
            loading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          otpBlock: false,
          buttonText: "SEND OTP",
          helperTextMobile: errorText.OTP_VALIDATION_ERROR,
          errorMobile: true,
          loading: false
        });
      });
  };

  handleSubmit(event) {
    event.preventDefault();
    const { mobileNumber, otpBlock, otp } = this.state;

    if (otpBlock) {
      this.context.addMobileNumber(mobileNumber);
      this.validateOTP(otp);
      // Verify Function
    } else {
      // Send OTP Function
      if (validateMobile(mobileNumber)) {
        this.sendOTP();
      } else {
        this.setState({
          otpBlock: false,
          buttonText: "SEND OTP",
          helperTextMobile: errorText.INVALID_MOBILE_NUMBER,
          errorMobile: true
        });
      }
    }
  }

  resendTimer = () => {
    this.setState({
      resendTimer: this.state.resendTimer - 1
    });
    if (this.state.resendTimer < 1) {
      this.setState({ resendDisabled: false });
      clearInterval(this.intervalId);
    }
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <LoginComponent
        data={this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        sendOTP={this.sendOTP}
      />
    );
  }
}

export default Login;
