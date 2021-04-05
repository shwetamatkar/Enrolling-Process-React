import React from "react";
import OnboardingContext from "../context/OnboardingContext";
import { Header, Footer } from "./Layout/Index";

export default class ContextTrigger extends React.Component {
  componentDidMount() {
    // console.log("Mounted");
    // console.log(this.context);
  }

  static contextType = OnboardingContext;

  render() {
    return (
      <div>
        <Header></Header>

        {/* <OnboardingContext.Consumer>
          {value => {
            console.log(value);
          }}
        </OnboardingContext.Consumer> */}
        <Footer></Footer>
      </div>
    );
  }
}

// FakeComponent.contextType = OnboardingContext;
