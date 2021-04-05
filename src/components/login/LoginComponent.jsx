import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Footer } from "../layout/index";
import resource from "../../resources/resource";
import SubmitButton from "../common/SubmitButton";

function LoginComponent(props) {
  const { data } = props;

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              error={data.errorMobile}
              helperText={data.helperTextMobile}
              fullWidth
              disabled={data.otpBlock}
              onChange={props.handleChange}
              value={data.mobileNumber}
              id="mobileNumber"
              label="Mobile Number"
              name="mobileNumber"
              autoComplete="mobileNumber"
              autoFocus
            />
            {data.otpBlock ? (
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={data.errorOTP}
                  helperText={data.helperOTP}
                  onChange={props.handleChange}
                  value={data.otp}
                  id="otp"
                  label="OTP"
                  name="otp"
                  autoComplete="off"
                />
                <Grid
                  container
                  spacing={4}
                  style={{ textAlign: "center", padding: 10 }}
                  alignItems="center"
                >
                  <Grid item>
                    <Button
                      disabled={data.resendDisabled}
                      type="submit"
                      variant="contained"
                      color={"primary"}
                      onClick={props.sendOTP}
                    >
                      RESEND OTP
                    </Button>
                  </Grid>
                  <Grid>
                    <CircularProgress
                      variant="static"
                      value={data.resendTimer}
                    />
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div></div>
            )}
            {/* <div className={classes.wrapper}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color={"primary"}
                disabled={data.loading}
                className={classes.submit}
                onClick={props.handleSubmit}
              >
                {data.buttonText}
              </Button>
              {data.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div> */}
            <SubmitButton
              loading={data.loading}
              disabled={false}
              onClick={props.handleSubmit}
              label={data.buttonText}
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
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  }
}));

export default LoginComponent;
