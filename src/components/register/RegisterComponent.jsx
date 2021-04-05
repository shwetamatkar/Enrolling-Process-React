import React from "react";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CreateOutlined from "@material-ui/icons/CreateOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Footer } from "../layout/index";
import { channelType } from "../../constants/selectMenu";
import { MenuItem } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import resource from "../../resources/resource";
import AlertBar from "../common/AlertBar";
import SubmitButton from "../common/SubmitButton";

function RegisterComponent(props) {
  const { data } = props;
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CreateOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Your Details
          </Typography>
          <Typography align="center">
            You are almost done.To complete your account creation, we need the
            following information from you.
          </Typography>
          <div className={classes.form}>
            <form onSubmit={props.handleSubmit}>
              <TextField
                disabled
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                value={data.mobileNumber}
                autoComplete="mobileNumber"
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={data.fullName}
                onChange={props.handleChange}
                error={data.errorFullName}
                helperText={data.helperFullName}
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="fullName"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="emailAddress"
                onChange={props.handleChange}
                value={data.emailAddress}
                error={data.errorEmail}
                helperText={data.helperEmail}
                label="Email Address"
                name="emailAddress"
                autoComplete="emailAddress"
              />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  format="DD-MM-YYYY"
                  margin="normal"
                  label="Date of Birth"
                  disableFuture
                  // variant="inline"
                  inputVariant="outlined"
                  error={data.errorDateOfBirth}
                  helperText={data.helperDateOfBirth}
                  fullWidth
                  value={data.dateOfBirth}
                  onChange={date => props.handleDateChange(date)}
                />
              </MuiPickersUtilsProvider>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                onChange={props.handleChange}
                value={data.pinCode}
                error={data.errorPinCode}
                helperText={data.helperPinCode}
                id="pinCode"
                label="Pin Code"
                name="pinCode"
                autoComplete="pinCode"
              />
              {/* <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="rmCode"
                error={data.errorRmCode}
                helperText={data.helperRmCode}
                onChange={props.handleChange}
                value={data.rmCode}
                label="Referees / RM Code"
                name="rmCode"
                autoComplete="rmCode"
              /> */}
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="channelType"
                onChange={props.handleChange}
                error={data.errorChannelType}
                helperText={data.helperChannelType}
                value={data.channelType}
                select
                label="Channel Type"
                name="channelType"
              >
                {channelType.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <SubmitButton
                loading={data.loadingPost}
                onClick={props.handleSubmit}
                label={"Register"}
              />
              {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                color={"primary"}
                className={classes.submit}
                onClick={props.handleSubmit}
              >
                Register
              </Button> */}
            </form>
            <AlertBar
              open={props.data.snackBar.status}
              onClose={props.closeSnackBar}
              severity={props.data.snackBar.severity}
              message={props.data.snackBar.message}
            />
            <Box mt={5}>
              <Footer />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
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
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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
  }
}));

export default RegisterComponent;
