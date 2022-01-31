import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// core components
import { useController } from "react-hook-form";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibleIcon from "@material-ui/icons/Visibility";
import VisibleOffIcon from "@material-ui/icons/VisibilityOff";

import styles from "assets/jss/nextjs-material-dashboard/components/customInputStyle.js";

const useStyles = makeStyles(styles);

export default function PasswordInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    success,
    name,
    onKeyPress,
  } = props;

  const { field, fieldState } = useController(props);
  const { error } = fieldState;

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const changeVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const temp = () => {};
  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        {...field}
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
        }}
        onKeyPress={onKeyPress ? onKeyPress : temp}
        type={isPasswordVisible ? "string" : "password"}
        name={name}
        id={id}
        endAdornment={
          <InputAdornment onClick={changeVisibility}>
            <IconButton>
              {isPasswordVisible ? <VisibleIcon /> : <VisibleOffIcon />}
            </IconButton>
          </InputAdornment>
        }
        {...inputProps}
      />
      {error ? <p className={classes.errorMsg}>{error?.message}</p> : null}
    </FormControl>
  );
}

PasswordInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
};
