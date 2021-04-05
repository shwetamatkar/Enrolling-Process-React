import api from "../../constants/api";
import axiosConfig from "../../util/axiosConfig";

class MyProfileService {
  checkStatus(payload) {
    return axiosConfig({
      method: "post",
      url: api.CHECK_STATUS,
      data: payload
    });
  }

  submitForm(payload) {
    return axiosConfig({
      method: "post",
      url: api.POST_SUBMIT_FORM,
      data: payload
    });
  }
}

export default new MyProfileService();
