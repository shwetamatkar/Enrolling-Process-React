import React from "react";
import AuthService from "../../authentication/AuthService";

class Logout extends React.Component {
  componentDidMount() {
    AuthService.logOut();
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Goodbye!</h1>
        <p style={{ textAlign: "center" }}>Have a happy and safe journey!</p>
      </div>
    );
  }
}

export default Logout;
