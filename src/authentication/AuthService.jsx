class AuthService {
  getUserInfo() {
    let userInfo = {
      mobile: sessionStorage.getItem("MOBILE"),
      token: sessionStorage.getItem("TOKEN")
    };
    return userInfo;
  }

  getAuthHeader() {
    if (sessionStorage.getItem("TOKEN") !== null) {
      return this.getUserInfo().token;
    }
  }

  checkAuthenticated() {
    return sessionStorage.getItem("TOKEN") !== null ? true : false;
  }

  logOut() {
    sessionStorage.clear();
  }
}

export default new AuthService();
