import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Footer } from "../layout/index";
import paths from "../../constants/paths";
import LoaderOverlay from "../loader/LoaderOverlay";
import resource from "../../resources/resource";
import SubmitButton from "../common/SubmitButton";
import AlertBar from "../common/AlertBar";
import InputField from "../common/InputField";

function PersonalInfoComponent(props) {
  const { data, formFields } = props;
  const classes = useStyles();

  const PageFields = formFields.map(function(item) {
    let FieldType = (
      <InputField
        key={item.id}
        item={item}
        formData={data.formData[item.id]}
        formRules={data.formRules[item.id]}
        disableFields={data.disableFields}
        handleChange={props.handleChange}
        handleDateChange={props.handleDateChange}
        getPinCodeMaster={props.getPinCodeMaster}
      />
    );

    return FieldType;

    // switch (item.type) {
    //   case "text": {
    //     FieldType = (
    //       <TextField
    //         key={item.id}
    //         variant="outlined"
    //         margin="normal"
    //         fullWidth
    //         required
    //         disabled={
    //           "disabled" in data.formRules[item.id]
    //             ? data.formRules[item.id].disabled
    //             : data.disableFields
    //         }
    //         value={data.formData[item.id]}
    //         onChange={props.handleChange}
    //         error={!data.formRules[item.id].valid}
    //         helperText={data.formRules[item.id].message}
    //         id={item.id}
    //         label={item.label}
    //         name={item.id}
    //         multiline={item.multiline != null ? item.multiline : false}
    //         autoComplete={item.id}
    //         autoFocus={"autofocus" in item ? item.autofocus : false}
    //         onInput={
    //           "onInput" in item
    //             ? e => onInputCheck(e, item.onInput, props)
    //             : null
    //         }
    //         type={"inputType" in item ? item.inputType : "text"}
    //       />
    //     );
    //     break;
    //   }
    //   case "select": {
    //     FieldType = (
    //       <TextField
    //         key={item.id}
    //         variant="outlined"
    //         margin="normal"
    //         fullWidth
    //         required
    //         disabled={
    //           "disabled" in data.formRules[item.id]
    //             ? data.formRules[item.id].disabled
    //             : data.disableFields
    //         }
    //         id={item.id}
    //         onChange={props.handleChange}
    //         value={data.formData[item.id]}
    //         error={!data.formRules[item.id].valid}
    //         helperText={data.formRules[item.id].message}
    //         select
    //         label={item.label}
    //         name={item.id}
    //       >
    //         {item.selectMenu.map(option => (
    //           <MenuItem key={option.value} value={option.value}>
    //             {option.label}
    //           </MenuItem>
    //         ))}
    //       </TextField>
    //     );
    //     break;
    //   }
    //   case "date": {
    //     FieldType = (
    //       <MuiPickersUtilsProvider utils={MomentUtils} key={item.id}>
    //         <KeyboardDatePicker
    //           format="DD-MM-YYYY"
    //           margin="normal"
    //           label={item.label}
    //           disableFuture
    //           required
    //           disabled={
    //             "disabled" in data.formRules[item.id]
    //               ? data.formRules[item.id].disabled
    //               : data.disableFields
    //           }
    //           inputVariant="outlined"
    //           error={!data.formRules[item.id].valid}
    //           helperText={data.formRules[item.id].message}
    //           fullWidth
    //           value={data.formData[item.id]}
    //           onChange={date => props.handleDateChange(date, item.id)}
    //         />
    //       </MuiPickersUtilsProvider>
    //     );
    //     break;
    //   }
    //   default: {
    //     FieldType = (
    //       <TextField
    //         key={item.id}
    //         variant="outlined"
    //         margin="normal"
    //         fullWidth
    //         required
    //         disabled={
    //           "disabled" in data.formRules[item.id]
    //             ? data.formRules[item.id].disabled
    //             : data.disableFields
    //         }
    //         value={data.formData[item.id]}
    //         onChange={props.handleChange}
    //         error={!data.formRules[item.id].valid}
    //         helperText={data.formRules[item.id].message}
    //         id={item.id}
    //         label={item.label}
    //         name={item.id}
    //         multiline={item.multiline != null ? item.multiline : false}
    //         autoComplete={item.id}
    //         autoFocus={"autofocus" in item ? item.autofocus : false}
    //         onInput={
    //           "onInput" in item
    //             ? e => onInputCheck(e, item.onInput, props)
    //             : null
    //         }
    //         type={"inputType" in item ? item.inputType : "text"}
    //       />
    //     );
    //   }
    // }

    // return FieldType;
  });

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <LoaderOverlay
          active={data.loading}
          text="Loading Personal Information..."
        >
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Personal Information
            </Typography>
            <div className={classes.form}>
              <form noValidate onSubmit={props.handleSubmit}>
                {data.formData.remarks !== "" ? (
                  <Typography
                    style={{
                      textAlign: "center",
                      color: "#b24434",
                      marginTop: 5
                    }}
                  >
                    Remark from Admin: {data.formData.remarks}
                  </Typography>
                ) : null}
                {PageFields}

                <SubmitButton
                  loading={data.loadingPost}
                  disabled={data.disableFields}
                  onClick={props.handleSubmit}
                  label={"Update"}
                />
              </form>
              <Grid style={{ textAlign: "right" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={paths.EDUCATION_DETAILS}
                >
                  <Button
                    variant="contained"
                    color={"primary"}
                    className={classes.submit}
                    onClick={props.handleNext}
                  >
                    Next: Education Details
                  </Button>
                </Link>
              </Grid>
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

export default PersonalInfoComponent;
