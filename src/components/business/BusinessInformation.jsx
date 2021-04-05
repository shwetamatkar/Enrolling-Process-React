import React, { Component } from "react";
import BusinessInformationComponent from "./BusinessInformationComponent";
import { isEmpty } from "../../validations/validateFields";
import errorText from "../../constants/errorText";
import BusinessInformationService from "./BusinessInformationService";
import { disableFieldCheck } from "../../util/commonService";

class BusinessInformation extends Component {
  constructor() {
    super();
    this.state = {
      primarySourceIncome: "",
      experience: "",
      dedicatedOffice: "",
      motorPremium: "",
      healthPremium: "",
      lifePremium: "",
      remarks: "",
      // agencyHealth: false,
      // agencyLife: false,
      // agencyGeneral: false,
      // posLife: false,
      // posGeneral: false,
      // surveyor: false,
      // none: false,
      // helperLicense: "",
      validations: {},
      snackBar: {
        status: false
      },
      disableFields: true,
      loading: true,
      loadingPost: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getBusinessInfo();
  }

  getBusinessInfo = () => {
    BusinessInformationService.get()
      .then(response => {
        const { data, status } = response;
        if (status === 200 && data.formStatus != null) {
          let disableFields = false;
          disableFields = disableFieldCheck(data.formStatus);

          this.setState({
            disableFields,
            loading: false,
            primarySourceIncome:
              data.primaryIncome == null ? "" : data.primaryIncome,
            experience: data.insuranceExp == null ? "" : data.insuranceExp,
            dedicatedOffice:
              data.dedicatedOffSpace == null ? "" : data.dedicatedOffSpace,
            motorPremium: data.monAvgBusMtr == null ? "" : data.monAvgBusMtr,
            healthPremium: data.monAvgBusMtrH == null ? "" : data.monAvgBusMtrH,
            lifePremium: data.monAvgBusLp == null ? "" : data.monAvgBusLp,
            remarks: data.remarks == null ? "" : data.remarks
            // agencyHealth: data.licenseHold.includes("AGENCY HEALTH")
            //   ? true
            //   : false,
            // agencyLife: data.licenseHold.includes("AGENCY LIFE") ? true : false,
            // agencyGeneral: data.licenseHold.includes("AGENCY GENERAL")
            //   ? true
            //   : false,
            // posLife: data.licenseHold.includes("POS LIFE") ? true : false,
            // posGeneral: data.licenseHold.includes("POS GENERAL") ? true : false,
            // surveyor: data.licenseHold.includes("SURVEYOR") ? true : false,
            // none: data.licenseHold.includes("NONE") ? true : false
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

  postBusinessInfo = () => {
    const {
      dedicatedOffice,
      experience,
      lifePremium,
      motorPremium,
      healthPremium,
      primarySourceIncome
      // agencyHealth,
      // agencyLife,
      // agencyGeneral,
      // posLife,
      // posGeneral,
      // surveyor,
      // none
    } = this.state;

    this.setState({ loadingPost: true });

    // let licenseHoldString = BusinessInformationService.checkBoxToString(
    //   agencyHealth,
    //   agencyLife,
    //   agencyGeneral,
    //   posLife,
    //   posGeneral,
    //   surveyor,
    //   none
    // );

    const payload = {
      // userId: AuthService.getUserInfo().mobile,
      dedicatedOffSpace: dedicatedOffice,
      insuranceExp: experience,
      // licenseHold: licenseHoldString,
      monAvgBusLp: lifePremium,
      monAvgBusMtr: motorPremium,
      monAvgBusMtrH: healthPremium,
      primaryIncome: primarySourceIncome
    };

    BusinessInformationService.post(payload)
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

  handleChange(event) {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // const { education } = this.state;

    let errorValidation = this.validateForm();

    if (errorValidation === false) {
      this.postBusinessInfo();
    }
  }

  closeSnackBar = () => {
    this.setState({
      snackBar: {
        status: false
      }
    });
  };

  validateForm = () => {
    const {
      primarySourceIncome,
      experience,
      dedicatedOffice,
      motorPremium,
      healthPremium,
      lifePremium
      // agencyHealth,
      // agencyLife,
      // agencyGeneral,
      // posLife,
      // posGeneral,
      // surveyor,
      // none
    } = this.state;

    let errorPrimarySourceIncome,
      errorExperience,
      errorDedicatedOffice,
      errorMotorPremium,
      errorHealthPremium,
      errorLifePremium;

    // helperLicense = "";

    errorPrimarySourceIncome = errorExperience = errorDedicatedOffice = errorMotorPremium = errorHealthPremium = errorLifePremium = false;
    let errorValidation = false;

    if (isEmpty(primarySourceIncome)) {
      errorValidation = true;
      errorPrimarySourceIncome = true;
    }

    if (isEmpty(experience)) {
      errorValidation = true;
      errorExperience = true;
    } else if (experience < 0) {
      errorValidation = true;
      errorExperience = true;
    }

    if (isEmpty(dedicatedOffice)) {
      errorValidation = true;
      errorDedicatedOffice = true;
    }

    if (isEmpty(motorPremium)) {
      errorValidation = true;
      errorMotorPremium = true;
    }

    if (isEmpty(healthPremium)) {
      errorValidation = true;
      errorHealthPremium = true;
    }

    if (isEmpty(lifePremium)) {
      errorValidation = true;
      errorLifePremium = true;
    }

    // if (
    //   agencyHealth === false &&
    //   agencyLife === false &&
    //   agencyGeneral === false &&
    //   posLife === false &&
    //   posGeneral === false &&
    //   surveyor === false &&
    //   none === false
    // ) {
    //   errorValidation = true;
    //   helperLicense = errorText.EMPTY_LICENSE;
    // } else if (
    //   none === true &&
    //   (agencyHealth === true ||
    //     agencyLife === true ||
    //     agencyGeneral === true ||
    //     posLife === true ||
    //     posGeneral === true ||
    //     surveyor === true)
    // ) {
    //   errorValidation = true;
    //   helperLicense = errorText.INVALID_LICENSE;
    // }

    this.setState({
      validations: {
        errorPrimarySourceIncome,
        errorExperience,
        errorDedicatedOffice,
        errorMotorPremium,
        errorHealthPremium,
        errorLifePremium
        // helperLicense
      }
    });

    return errorValidation;
  };

  render() {
    return (
      <div>
        <BusinessInformationComponent
          data={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          closeSnackBar={this.closeSnackBar}
        />
      </div>
    );
  }
}

export default BusinessInformation;
