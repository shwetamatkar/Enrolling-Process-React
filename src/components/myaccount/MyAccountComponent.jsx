import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FaceIcon from "@material-ui/icons/Face";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import AssignmentIcon from "@material-ui/icons/Assignment";
import paths from "../../constants/paths";

const Menu = [
  {
    id: "1",
    text: "My Profile",
    target: paths.MY_PROFILE,
    icon: <FaceIcon />
  },
  {
    id: "2",
    text: "Certificates",
    target: paths.CERTIFICATES,
    icon: <MenuBookIcon />
  },
  { id: "3", text: "Exam", target: paths.EXAM, icon: <AssignmentIcon /> },
  { id: "4", text: "Logout", target: paths.LOGOUT, icon: <ExitToAppIcon /> }
];

function PaperContainer(props) {
  const { text } = props;
  const classes = useStyles();
  return (
    <Paper elevation={2} className={classes.container}>
      <Grid
        container
        wrap="nowrap"
        spacing={2}
        direction="row"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Avatar className={classes.avatar}>{props.children}</Avatar>
        </Grid>
        <Grid item xs={8}>
          <Typography>{text}</Typography>
        </Grid>
        <Grid item xs={2}>
          <ChevronRightIcon />
        </Grid>
      </Grid>
    </Paper>
  );
}

function MyAccountComponent(props) {
  const classes = useStyles();

  const MenuItems = Menu.map(item => (
    <div key={item.id} onClick={() => props.handleClick(item.target)}>
      <PaperContainer text={item.text} key={item.text}>
        {item.icon}
      </PaperContainer>
    </div>
  ));

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div>
          <div style={{ padding: 20 }}>
            <Typography component="h1" variant="h5">
              My Account
            </Typography>
          </div>
          <div>{MenuItems}</div>
        </div>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    justifyContent: "center"
  },
  image: {
    backgroundImage:
      "url(https://petapixel.com/assets/uploads/2013/04/waterski2.webp)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
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
  },
  container: {
    margin: theme.spacing(2),
    padding: theme.spacing(0)
  }
}));

export default MyAccountComponent;
