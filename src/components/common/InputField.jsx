import React from "react";
import TextField from "@material-ui/core/TextField";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { MenuItem } from "@material-ui/core";
import FileUpload from "../common/FileUpload";
import FormHelperText from "@material-ui/core/FormHelperText";

const onInputCheck = (e, validity, props) => {
  if (validity.fetchCity) {
    if (e.target.value.length === validity.fetchCity) {
      props.getPinCodeMaster(e.target.value);
    }
  }

  if (validity.maxLength) {
    if (e.target.value.length > 0) {
      return (e.target.value = Math.max(0, parseInt(e.target.value))
        .toString()
        .slice(0, validity.maxLength));
    }
  }
};

function InputField(props) {
  const { item, formRules, formData, disableFields } = props;

  let FieldType = null;

  switch (item.type) {
    case "text": {
      FieldType = (
        <TextField
          key={item.id}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          disabled={
            "disabled" in formRules ? formRules.disabled : disableFields
          }
          value={formData}
          onChange={props.handleChange}
          error={!formRules.valid}
          helperText={formRules.message}
          id={item.id}
          label={item.label}
          name={item.id}
          multiline={item.multiline != null ? item.multiline : false}
          autoComplete={item.id}
          autoFocus={"autofocus" in item ? item.autofocus : false}
          onInput={
            "onInput" in item ? e => onInputCheck(e, item.onInput, props) : null
          }
          type={"inputType" in item ? item.inputType : "text"}
        />
      );
      break;
    }
    case "select": {
      FieldType = (
        <TextField
          key={item.id}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          disabled={
            "disabled" in formRules ? formRules.disabled : disableFields
          }
          id={item.id}
          onChange={props.handleChange}
          value={formData}
          error={!formRules.valid}
          helperText={formRules.message}
          select
          label={item.label}
          name={item.id}
        >
          {item.selectMenu.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
      break;
    }
    case "date": {
      FieldType = (
        <MuiPickersUtilsProvider utils={MomentUtils} key={item.id}>
          <KeyboardDatePicker
            format="DD-MM-YYYY"
            margin="normal"
            label={item.label}
            disableFuture
            required
            disabled={
              "disabled" in formRules ? formRules.disabled : disableFields
            }
            inputVariant="outlined"
            error={!formRules.valid}
            helperText={formRules.message}
            fullWidth
            value={formData}
            onChange={date => props.handleDateChange(date, item.id)}
          />
        </MuiPickersUtilsProvider>
      );
      break;
    }
    case "file": {
      FieldType = (
        <div>
          <FileUpload
            onChange={props.handleFile}
            title={item.label}
            id={item.id}
            error={!formRules.valid}
            fileName={formData}
            data={disableFields}
          />
          <FormHelperText error style={{ textAlign: "center" }}>
            {formRules.message}
          </FormHelperText>
        </div>
      );
      break;
    }
    default: {
      FieldType = (
        <TextField
          key={item.id}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          disabled={
            "disabled" in formRules ? formRules.disabled : disableFields
          }
          value={formData}
          onChange={props.handleChange}
          error={!formRules.valid}
          helperText={formRules.message}
          id={item.id}
          label={item.label}
          name={item.id}
          multiline={item.multiline != null ? item.multiline : false}
          autoComplete={item.id}
          autoFocus={"autofocus" in item ? item.autofocus : false}
          onInput={
            "onInput" in item ? e => onInputCheck(e, item.onInput, props) : null
          }
          type={"inputType" in item ? item.inputType : "text"}
        />
      );
    }
  }

  return FieldType;
}

export default React.memo(InputField);
