import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Footer } from "../layout/index";
import paths from "../../constants/paths";
import { Link } from "react-router-dom";
import resource from "../../resources/resource";
import LoaderOverlay from "../loader/LoaderOverlay";
import SubmitButton from "../common/SubmitButton";
import AlertBar from "../common/AlertBar";
import InputField from "../common/InputField";

function DocumentUploadComponent(props) {
  const { data, formFields } = props;
  const classes = useStyles();

  const PageFields = formFields.map(function(item) {
    let FieldType = null;
    FieldType = (
      <InputField
        key={item.id}
        item={item}
        formData={data.formData[item.id]}
        formRules={data.formRules[item.id]}
        disableFields={data.disableFields}
        handleChange={props.handleChange}
        handleFile={props.fileSelectedHandler}
      />
    );
    return FieldType;
  });

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <LoaderOverlay
          active={data.loading}
          text="Loading Uploaded Documents..."
        >
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Document Upload
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
                <br />
                <Typography align="center">
                  Only JPEG, PNG and PDF file format with maximum size of 5 MB
                  is allowed.
                </Typography>
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
                  to={paths.BUSINESS_INFORMATION}
                >
                  <Button
                    variant="contained"
                    color={"primary"}
                    className={classes.submit}
                    onClick={props.handleNext}
                  >
                    Next: Business Information
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

export default DocumentUploadComponent;
