import React from "react";
import Button from "@material-ui/core/Button";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import {
  Paper,
  Typography,
  Grid,
  makeStyles,
  TextField
} from "@material-ui/core";
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js`;

function PdfReaderComponent(props) {
  const classes = useStyles();

  const {
    pageNumber,
    numPages,
    pageNumberField,
    pageSearchField,
    height
  } = props;
  return (
    <Grid container component="main" className={classes.root}>
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Paper elevation={6}>
        <div>
          <Document
            file={props.pdfFile}
            onLoadSuccess={props.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} height={height} />
          </Document>
          <div>
            {pageSearchField && (
              <div style={{ padding: 20 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  onChange={props.handleChange}
                  id="pageNumber"
                  label="Page Number"
                  name="pageNumber"
                />
              </div>
            )}
            {pageNumberField && (
              <Typography style={{ textAlign: "center" }}>
                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
              </Typography>
            )}
            <div style={{ textAlign: "center", padding: 10 }}>
              <Button
                variant="contained"
                color={"primary"}
                type="button"
                size="small"
                disabled={pageNumber <= 1}
                onClick={props.previousPage}
              >
                Previous
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                color={"primary"}
                size="small"
                disabled={pageNumber >= numPages}
                onClick={props.nextPage}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}

export default PdfReaderComponent;

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: "center",
    height: 0
  },
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(0)
  }
}));
