import React, { Component } from "react";
import PdfReaderComponent from "./PdfReaderComponent";
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js`;

// const DocumentFile = require("../../resources/POS_Content_V1.pdf");

export class PdfReader extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  onDocumentLoadSuccess = document => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1
    });
  };

  handleChange = event => {
    const { value, name } = event.target;
    if (value > 1 && value <= this.state.numPages) {
      this.setState({
        [name]: parseInt(value)
      });
    }
  };

  goToPage = pageNumber => {
    this.setState({
      pageNumber
    });
  };

  changePage = offset =>
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + offset
    }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    const { pageNumberField, pageSearchField, DocumentFile } = this.props;
    return (
      <PdfReaderComponent
        onDocumentLoadSuccess={this.onDocumentLoadSuccess}
        numPages={this.state.numPages}
        pageNumber={this.state.pageNumber}
        handleChange={this.handleChange}
        nextPage={this.nextPage}
        previousPage={this.previousPage}
        pdfFile={DocumentFile}
        pageNumberField={pageNumberField}
        pageSearchField={pageSearchField}
        height={this.state.height - 50}
      />
    );
  }
}
