import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "assets/jss/nextjs-material-dashboard/components/cardSubHeaderStyle.js";

export default function CardSubHeader(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { className, children, color, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes["cardSubHeader"]]: true,
    [classes[color + "CardSubHeader"]]: color,
    [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardSubHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
    "dark",
  ]),
  children: PropTypes.node,
};
