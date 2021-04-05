import React from "react";
import { Button, Typography, makeStyles, Grid } from "@material-ui/core";
// import "bootstrap/dist/css/bootstrap.css";

function FileUpload(props) {
  const { fileName, title, onChange, data, id, error } = props;
  const classes = useStyles();

  let borderColor = "#d1d1d1";
  if (error) {
    borderColor = "#b24434";
  }

  return (
    <div>
      <div className={classes.documentName}>
        <Typography>{title}</Typography>
      </div>
      <div>
        <Grid
          container
          className={classes.container}
          style={{ borderColor: borderColor }}
        >
          <Grid item xs={7} sm={8} md={9} className={classes.fileNameContainer}>
            <Typography>{fileName}</Typography>
          </Grid>
          <Grid item xs={5} sm={4} md={3} className={classes.fileNameContainer}>
            <Button
              variant="contained"
              disabled={data.disableFields}
              color="primary"
              disableElevation
              component="label"
            >
              Upload File
              <input
                type="file"
                accept="image/*"
                id={id}
                onChange={onChange}
                style={{ display: "none" }}
              />
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    borderRadius: 4,
    alignItems: "center"
  },
  documentName: {
    padding: 5
  },
  fileNameContainer: {},
  fileButtonContainer: {}
});

export default React.memo(FileUpload);
