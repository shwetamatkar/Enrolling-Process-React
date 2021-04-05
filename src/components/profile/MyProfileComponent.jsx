import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import FaceIcon from "@material-ui/icons/Face";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DescriptionIcon from "@material-ui/icons/Description";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import LoaderOverlay from "../loader/LoaderOverlay";
import resource from "../../resources/resource";
import paths from "../../constants/paths";
import SubmitButton from "../common/SubmitButton";
import AlertBar from "../common/AlertBar";
import constants from "../../constants/constants";

const Menu = [
  {
    id: "personalInfo",
    text: "Personal Information",
    target: paths.PERSONAL_INFORMATION,
    icon: <ContactPhoneIcon />,
    status: ""
  },
  {
    id: "educationInfo",
    text: "Education Details",
    target: paths.EDUCATION_DETAILS,
    icon: <CastForEducationIcon />,
    status: ""
  },
  {
    id: "bankInfo",
    text: "Bank Details",
    target: paths.BANK_DETAILS,
    icon: <AccountBalanceIcon />,
    status: ""
  },
  {
    id: "docInfo",
    text: "Upload Documents",
    target: paths.UPLOAD_DOCUMENTS,
    icon: <DescriptionIcon />,
    status: ""
  },
  {
    id: "businessInfo",
    text: "Business Information",
    target: paths.BUSINESS_INFORMATION,
    icon: <BusinessCenterIcon />,
    status: ""
  }
];

const UserInfoData = [
  {
    id: "fullName",
    text: "",
    icon: <FaceIcon />
  },
  {
    id: "emailAddress",
    text: "",
    icon: <EmailIcon />
  },
  {
    id: "mobileNumber",
    text: "",
    icon: <PhoneIcon />
  }
];

function PaperContainer(props) {
  const { text, status } = props;
  const { statusColor } = constants;
  const classes = useStyles();
  let statusIcon = null;
  if (status === "") {
    statusIcon = null;
  }
  if (status === "PENDING") {
    statusIcon = <CheckCircleIcon style={{ color: statusColor.pending }} />;
  }
  if (status === "SUBMITTED") {
    statusIcon = <CheckCircleIcon style={{ color: statusColor.submitted }} />;
  }
  if (status === "REJECTED") {
    statusIcon = <ErrorIcon style={{ color: statusColor.rejected }} />;
  }
  if (status === "APPROVED") {
    statusIcon = <CheckCircleIcon style={{ color: statusColor.approved }} />;
  }

  return (
    <Paper elevation={2} className={classes.container}>
      <Grid
        container
        wrap="nowrap"
        spacing={2}
        direction="row"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Avatar className={classes.avatar}>{props.children}</Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography>{text}</Typography>
        </Grid>
        <Grid item xs={2}>
          {statusIcon}
        </Grid>
      </Grid>
    </Paper>
  );
}

function UserInfoContainer(props) {
  const { text } = props;

  return (
    <div>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={2} style={{ paddingLeft: 10 }}>
          {props.children}
        </Grid>
        <Grid item xs={8}>
          <Typography>{text}</Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

function MyProfileComponent(props) {
  const { data } = props;
  const classes = useStyles();

  const MenuItems = Menu.map(item => (
    <div key={item.id} onClick={() => props.handleClick(item.target)}>
      <PaperContainer text={item.text} status={data[item.id]}>
        {item.icon}
      </PaperContainer>
    </div>
  ));

  const UserInfo = UserInfoData.map(item => (
    <div key={item.id}>
      <UserInfoContainer text={data[item.id]}>{item.icon}</UserInfoContainer>
    </div>
  ));

  return (
    <Grid container component="main" className={classes.root}>
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div>
          <div style={{ padding: 20 }}>
            <Typography component="h1" variant="h5">
              My Profile
            </Typography>
          </div>
          <LoaderOverlay active={data.loading} text="Loading Status...">
            <Paper className={classes.container}>{UserInfo}</Paper>
            <div>{MenuItems}</div>
            <div>
              <Grid style={{ textAlign: "center" }}>
                <SubmitButton
                  loading={data.loadingPost}
                  disabled={data.disabledSubmit}
                  onClick={props.submitForm}
                  label={"Submit Complete Form"}
                  fullWidth={false}
                />
              </Grid>
            </div>
          </LoaderOverlay>
        </div>
        <AlertBar
          open={props.data.snackBar.status}
          onClose={props.closeSnackBar}
          severity={props.data.snackBar.severity}
          message={props.data.snackBar.message}
        />
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    justifyContent: "center"
  },
  image: {
    backgroundImage: `url(${resource.background_img})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(0)
  }
}));

export default MyProfileComponent;
