import api from "../../constants/api";
import axiosConfig from "../../util/axiosConfig";

class BusinessInformationService {
  // checkBoxToString = (
  //   agencyHealth,
  //   agencyLife,
  //   agencyGeneral,
  //   posLife,
  //   posGeneral,
  //   surveyor,
  //   none
  // ) => {
  //   let licenseHold = [];

  //   if (agencyHealth) licenseHold.push("AGENCY HEALTH");
  //   if (agencyLife) licenseHold.push("AGENCY LIFE");
  //   if (agencyGeneral) licenseHold.push("AGENCY GENERAL");
  //   if (posLife) licenseHold.push("POS LIFE");
  //   if (posGeneral) licenseHold.push("POS GENERAL");
  //   if (surveyor) licenseHold.push("SURVEYOR");
  //   if (none) licenseHold.push("NONE");

  //   return licenseHold.join(",");
  // };

  post(data) {
    return axiosConfig({
      method: "post",
      url: api.POST_BUSINESS_INFO,
      data: data
    });
  }

  get() {
    return axiosConfig({
      method: "get",
      url: api.GET_BUSINESS_INFO
    });
  }
}

export default new BusinessInformationService();
