import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/customInputStyle.js";
import { useController } from "react-hook-form";
import { MenuItem } from "@material-ui/core";

const customStyles = {
  select: {
    "&:before": {
      borderColor: "#D2D2D2",
    },
    "&:after": {
      borderColor: "#D2D2D2",
    },
  },
  icon: {
    fill: "#D2D2D2",
  },
};
const useStyles = makeStyles({ ...styles, ...customStyles });

export default function CustomDropDown(props) {
  const classes = useStyles();

  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    optionData,
    inputProps,
    name,
    success,
  } = props;

  const { field, fieldState } = useController(props);
  const { onChange, value } = field;
  const { error } = fieldState;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
  });

  const handleChange = (e) => {
    onChange(e.target.value);
  };

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
      <Select
        value={value}
        className={classes.select}
        onChange={handleChange}
        inputProps={{
          name: name,
          ...inputProps,
        }}
      >
        {optionData?.map((option) => {
          return (
            <MenuItem value={option.id} key={option.id}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
      {error ? <p className={classes.errorMsg}>{error?.message}</p> : null}
    </FormControl>
  );
}

CustomDropDown.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
};
