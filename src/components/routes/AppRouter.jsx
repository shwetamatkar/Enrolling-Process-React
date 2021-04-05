import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../login/Login";
import ProtectedPage from "./ProtectedPage";
import Register from "../register/Register";
import LoginRedirect from "../login/LoginRedirect";
import MyAccount from "../myaccount/MyAccount";
import MyProfile from "../profile/MyProfile";
import PersonalInfo from "../personalInfo/PersonalInfo";
import EducationDetails from "../education/EducationDetails";
import BankDetails from "../bank/BankDetails";
import DocumentUpload from "../documents/DocumentUpload";
import BusinessInformation from "../business/BusinessInformation";
import Training from "../training/Training";
import NotFound from "./NotFound";
import paths from "../../constants/paths";
import Logout from "../logout/Logout";
import ExamApp from "../../exam/ExamApp";
import Exam from "../../examination/Exam";

const AppRouter = ({ children }) => {
  return (
    <Router basename={"/"}>
      {/* <Router> */}
      {children}
      <Switch>
        <Route exact path={paths.LOGIN_IN} component={Login}></Route>
        <Route extact path={paths.INVALID} component={ProtectedPage}></Route>
        <PrivateRoute
          exact
          path={paths.REGISTER}
          component={Register}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.LOGIN_REDIRECT}
          component={LoginRedirect}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.MY_ACCOUNT}
          component={MyAccount}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.MY_PROFILE}
          component={MyProfile}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.PERSONAL_INFORMATION}
          component={PersonalInfo}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.EDUCATION_DETAILS}
          component={EducationDetails}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.BANK_DETAILS}
          component={BankDetails}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.UPLOAD_DOCUMENTS}
          component={DocumentUpload}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.BUSINESS_INFORMATION}
          component={BusinessInformation}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.CERTIFICATES}
          component={Training}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.LOGOUT}
          component={Logout}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path={paths.EXAM}
          component={ExamApp}
        ></PrivateRoute>
        <Route exact path={"/examnew"} component={Exam}></Route>

        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
