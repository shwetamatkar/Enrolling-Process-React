import React, { Component } from "react";
import MyProfileComponent from "./MyProfileComponent";
import AuthService from "../../authentication/AuthService";
import MyProfileService from "./MyProfileService";
import { submitCheck } from "../../util/commonService";
import errorText from "../../constants/errorText";
import api from "../../constants/api";
import axiosConfig from "../../util/axiosConfig";

class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loadingPost: false,
      disabledSubmit: true,
      snackBar: {
        status: false
      }
    };
  }

  componentDidMount() {
    this.fetchInfomation();
  }

  handleClick = target => {
    this.props.history.push(target);
  };

  fetchInfomation = () => {
    this.getPersonalInfo();
    this.getStatus();
  };

  checkFinalSubmit = data => {
    const {
      personalInfo,
      educationInfo,
      bankInfo,
      docInfo,
      businessInfo
    } = data;

    if (
      submitCheck(personalInfo) &&
      submitCheck(educationInfo) &&
      submitCheck(bankInfo) &&
      submitCheck(docInfo) &&
      submitCheck(businessInfo)
    ) {
      this.setState({
        disabledSubmit: false
      });
    }
  };

  getPersonalInfo = () => {
    const payload = { mobileNumber: AuthService.getUserInfo().mobile };
    axiosConfig({
      method: "post",
      url: api.GET_PERSONAL_INFO,
      data: payload
    })
      .then(response => {
        const { data, status } = response;
        if (status === 200) {
          this.setState({
            fullName: data.fullName,
            emailAddress: data.emailAddress,
            mobileNumber: AuthService.getUserInfo().mobile
          });
        }
      })
      .catch(response => {
        // Declare Error
        alert(response);
        this.setState({ disabledSubmit: true });
      });
  };

  getStatus = () => {
    const payload = { mobileNumber: AuthService.getUserInfo().mobile };

    MyProfileService.checkStatus(payload)
      .then(response => {
        const { data, status } = response;
        if (status === 200) {
          this.checkFinalSubmit(data);
          this.setState({
            loading: false,
            personalInfo: data.personalInfo,
            educationInfo: data.educationInfo,
            bankInfo: data.bankInfo,
            docInfo: data.docInfo,
            businessInfo: data.businessInfo
          });
        }
      })
      .catch(response => {
        // Declare Error
        alert(response);
        this.setState({ loading: false, disabledSubmit: true });
      });
  };

  postSumbitForm = () => {
    const payload = { mobileNumber: AuthService.getUserInfo().mobile };

    this.setState({ loadingPost: true });

    MyProfileService.submitForm(payload)
      .then(response => {
        const { status, data } = response;
        if (status === 200 && data.status === "TRUE") {
          this.setState({
            loadingPost: false,
            personalInfo: "SUBMITTED",
            educationInfo: "SUBMITTED",
            bankInfo: "SUBMITTED",
            docInfo: "SUBMITTED",
            businessInfo: "SUBMITTED",
            disabledSubmit: true,
            snackBar: {
              status: true,
              message: errorText.INFORMATION_UPDATE_SUCCESS,
              severity: "success"
            }
          });
        } else {
          this.setState({
            loadingPost: false,
            snackBar: {
              status: true,
              message: errorText.INFORMATION_UPDATE_ERROR,
              severity: "error"
            }
          });
        }
      })
      .catch(response => {
        // Declare Error
        this.setState({
          loadingPost: false,
          snackBar: {
            status: true,
            message: errorText.INFORMATION_UPDATE_ERROR,
            severity: "error"
          }
        });
      });
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
        <MyProfileComponent
          handleClick={this.handleClick}
          data={this.state}
          submitForm={this.postSumbitForm}
          closeSnackBar={this.closeSnackBar}
        />
      </div>
    );
  }
}

export default MyProfile;
