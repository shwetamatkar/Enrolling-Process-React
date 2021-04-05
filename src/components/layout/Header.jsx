import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import resource from "../../resources/resource";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AuthService from "../../authentication/AuthService";
import paths from "../../constants/paths";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false
    };
    this.goBack = this.goBack.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  goHome() {
    this.props.history.push(paths.MY_ACCOUNT);
  }

  render() {
    let backButton = <div></div>;
    let homeButton = <div></div>;

    if (
      AuthService.checkAuthenticated() &&
      this.props.location.pathname !== "/logout"
    ) {
      backButton = (
        <div>
          <IconButton
            onClick={this.goBack}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
      );

      homeButton = (
        <Button
          onClick={this.goHome}
          type="submit"
          variant="outlined"
          color={"inherit"}
        >
          Home
        </Button>
      );
    }

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              direction="row"
              alignItems="center"
              style={{ textAlign: "center" }}
            >
              <Grid item xs={2}>
                {backButton}
              </Grid>
              <Grid item xs={8}>
                <img
                  src={resource.logo}
                  alt="SM-Tech Logo"
                  style={styles.logo}
                />
              </Grid>
              <Grid item xs={2}>
                <div>{homeButton}</div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = {
  logo: {
    height: 64,
    width: 64,
    justifyContent: "center",
    alignItems: "center",
    padding: 5
  }
};

export default withRouter(Header);
