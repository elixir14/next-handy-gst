import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "renderer/assetsjss/nextjs-material-dashboard/components/typographyStyle.js";

export default function Primary(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children, wrappedClass } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.primaryText + " " + wrappedClass}>
      {children}
    </div>
  );
}

Primary.propTypes = {
  children: PropTypes.node,
};
