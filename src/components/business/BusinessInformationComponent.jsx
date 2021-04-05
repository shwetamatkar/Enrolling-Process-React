import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import { Footer } from "../layout/index";
import { MenuItem } from "@material-ui/core";
import { yesNo, slab, primarySourceIncome } from "../../constants/selectMenu";
import FormHelperText from "@material-ui/core/FormHelperText";
import resource from "../../resources/resource";
import LoaderOverlay from "../loader/LoaderOverlay";
import SubmitButton from "../common/SubmitButton";
import AlertBar from "../common/AlertBar";

function BusinessInformationComponent(props) {
  const { data } = props;

  const classes = useStyles();

  // const checkBoxFields = [
  //   {
  //     id: "agencyHealth",
  //     value: "AGENCY HEALTH",
  //     label: "Agency Health"
  //   },
  //   {
  //     id: "agencyLife",
  //     value: "AGENCY LIFE",
  //     label: "Agency Life"
  //   },
  //   {
  //     id: "agencyGeneral",
  //     value: "AGENCY GENERAL",
  //     label: "Agency General"
  //   },
  //   {
  //     id: "posLife",
  //     value: "POS LIFE",
  //     label: "POS Life"
  //   },
  //   {
  //     id: "posGeneral",
  //     value: "POS GENERAL",
  //     label: "POS General"
  //   },
  //   {
  //     id: "surveyor",
  //     value: "SURVEYOR",
  //     label: "Surveyor"
  //   },
  //   {
  //     id: "none",
  //     value: "NONE",
  //     label: "None"
  //   }
  // ];

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <LoaderOverlay active={data.loading} text="Loading Business Details...">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Business Information
            </Typography>
            <div className={classes.form}>
              {data.remarks !== "" ? (
                <Typography
                  style={{
                    textAlign: "center",
                    color: "#b24434",
                    marginTop: 5
                  }}
                >
                  Remark from Admin: {data.remarks}
                </Typography>
              ) : null}
              <form noValidate onSubmit={props.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="primarySourceIncome"
                  disabled={data.disableFields}
                  onChange={props.handleChange}
                  value={data.primarySourceIncome}
                  error={data.validations.errorPrimarySourceIncome}
                  select
                  required
                  label="Primary Source of Income"
                  name="primarySourceIncome"
                >
                  {primarySourceIncome.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  disabled={data.disableFields}
                  value={data.experience}
                  error={data.validations.errorExperience}
                  onChange={props.handleChange}
                  id="experience"
                  type="number"
                  label="Years of Experience in Insurance"
                  name="experience"
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="dedicatedOffice"
                  disabled={data.disableFields}
                  error={data.validations.errorDedicatedOffice}
                  onChange={props.handleChange}
                  value={data.dedicatedOffice}
                  select
                  required
                  label="Dedicated office space for business?"
                  name="dedicatedOffice"
                >
                  {yesNo.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Typography style={{ fontWeight: "bold", paddingTop: 20 }}>
                  Monthly Average Business
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="motorPremium"
                  disabled={data.disableFields}
                  onChange={props.handleChange}
                  error={data.validations.errorMotorPremium}
                  value={data.motorPremium}
                  select
                  required
                  label="Motor Premium"
                  name="motorPremium"
                >
                  {slab.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="healthPremium"
                  disabled={data.disableFields}
                  onChange={props.handleChange}
                  error={data.validations.errorHealthPremium}
                  value={data.healthPremium}
                  select
                  required
                  label="Health Premium"
                  name="healthPremium"
                >
                  {slab.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="lifePremium"
                  disabled={data.disableFields}
                  onChange={props.handleChange}
                  error={data.validations.errorLifePremium}
                  value={data.lifePremium}
                  select
                  required
                  label="Life Premium"
                  name="lifePremium"
                >
                  {slab.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {/* <Typography style={{ paddingTop: 10 }}>
                Which of the following license do you currently hold?
              </Typography>
              {checkBoxFields.map(item => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      id={item.id}
                      name={item.id}
                      disabled={data.disableFields}
                      checked={data[item.id]}
                      onChange={props.handleChange}
                      value={item.value}
                    />
                  }
                  label={item.label}
                />
              ))} */}

                <FormHelperText error style={{ textAlign: "center" }}>
                  {data.validations.helperLicense}
                </FormHelperText>

                <SubmitButton
                  loading={data.loadingPost}
                  disabled={data.disableFields}
                  onClick={props.handleSubmit}
                  label={"Update"}
                />
              </form>
              {/* <Grid style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color={"primary"}
                className={classes.submit}
                onClick={props.handleNext}
              >
                Submit Complete Form
              </Button>
            </Grid> */}
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
        </LoaderOverlay>
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
  }
}));

export default BusinessInformationComponent;
