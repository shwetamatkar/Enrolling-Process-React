import React from "react";
import OnboardingContext from "./OnboardingContext";

class GlobalState extends React.Component {
  constructor() {
    super();
    this.state = {
      mobileNumber: null,
      isVerified: false
    };
  }

  addMobileNumber = mobileNumber => {
    this.setState({ mobileNumber });
  };

  setVerification = status => {
    this.setState({ isVerified: status });
  };

  render() {
    return (
      <OnboardingContext.Provider
        value={{
          userDetails: this.state,
          addMobileNumber: this.addMobileNumber,
          setVerification: this.setVerification
        }}
      >
        {this.props.children}
      </OnboardingContext.Provider>
    );
  }
}

export default GlobalState;
