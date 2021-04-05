import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

function SubmitButton(props) {
  const { loading, label, disabled, fullWidth, margin } = props;
  const classes = useStyles();

  let disableButton = false;

  if (disabled) {
    disableButton = true;
  } else {
    disableButton = loading;
  }

  return (
    <div className={classes.wrapper}>
      <Button
        type="submit"
        fullWidth={fullWidth}
        variant="contained"
        color={"primary"}
        disabled={disableButton}
        className={margin != null ? classes.noMargin : classes.submit}
        onClick={props.onClick}
      >
        {label}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
}

SubmitButton.defaultProps = {
  fullWidth: true,
  disabled: false
};

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  noMargin: {},
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -8,
    marginLeft: -10
  }
}));

export default React.memo(SubmitButton);
