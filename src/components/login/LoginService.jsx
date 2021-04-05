import decode from "jwt-decode";
import api from "../../constants/api";
import axiosConfig from "../../util/axiosConfig";

class LoginService {
  sendOTP(credentials) {
    return axiosConfig({
      method: "post",
      url: api.SEND_OTP,
      data: credentials
    });
  }

  login(otp) {
    return axiosConfig({
      method: "post",
      url: api.VALIDATE_OTP,
      data: otp
    });
  }

  checkRegistration(mobileNumber) {
    return axiosConfig({
      method: "post",
      url: api.CHECK_REGISTRATION,
      data: mobileNumber
    });
  }

  setSession(token) {
    sessionStorage.setItem("TOKEN", token);
    let tokenDetails = decode(token);
    sessionStorage.setItem("MOBILE", tokenDetails.sub);
  }
}

export default new LoginService();
