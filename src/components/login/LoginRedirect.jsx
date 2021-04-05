import React from "react";
import paths from "../../constants/paths";
import LoginService from "./LoginService";

class LoginRedirect extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.isRegistered(this.props.location.state.mobileNumber);
  }

  isRegistered = mobileNumber => {
    const payload = { mobileNumber: mobileNumber };
    // API Call for isRegistered
    LoginService.checkRegistration(payload)
      .then(response => {
        if (response.data.status === "TRUE") {
          this.setState({
            loading: false
          });
          this.props.history.replace({
            pathname: paths.MY_ACCOUNT,
            mobileNumber: "9167829393"
          });
        } else {
          this.props.history.replace({
            pathname: paths.REGISTER
          });
        }
      })
      .catch(() => {
        alert("Error");
      });
  };

  render() {
    return <div></div>;
  }
}

export default LoginRedirect;
