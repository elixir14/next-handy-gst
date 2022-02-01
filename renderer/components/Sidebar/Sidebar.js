/*eslint-disable*/
import React, { useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";

import styles from "assets/jss/nextjs-material-dashboard/components/sidebarStyle.js";

export default function Sidebar(props) {
  // used for checking current route
  const router = useRouter();
  // creates styles for this component
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [isShow, setIsShow] = useState(false);
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return router.route.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logo, logoText, routes } = props;

  const Item = ({ route, child, concatPath }) => {
    let activePro = " ";
    let listItemClasses;
    if (route.path === "/upgrade-to-pro") {
      activePro = classes.activePro + " ";
      listItemClasses = classNames({
        [" " + classes[color]]: true,
      });
    } else {
      listItemClasses = classNames({
        [" " + classes[color]]: activeRoute(route.path),
      });
    }
    const whiteFontClasses = classNames({
      [" " + classes.whiteFont]:
        activeRoute(route.path) || route.path === "/upgrade-to-pro",
    });

    const InnerItem = () => (
      <ListItem button className={classes.itemLink + listItemClasses}>
        {typeof route.icon === "string" ? (
          <Icon
            className={classNames(classes.itemIcon, whiteFontClasses, {
              [classes.itemIconRTL]: props.rtlActive,
            })}
          >
            {route.icon}
          </Icon>
        ) : (
          <route.icon
            className={classNames(classes.itemIcon, whiteFontClasses, {
              [classes.itemIconRTL]: props.rtlActive,
            })}
          />
        )}
        {Array.isArray(route?.children) && (
          <ArrowDropDownIcon
            style={{
              marginLeft: "auto",
              color: "black",
              position: "absolute",
              right: 20,
              top: "13px",
            }}
          />
        )}
        <ListItemText
          primary={props.rtlActive ? route.rtlName : route.name}
          className={classNames(classes.itemText, whiteFontClasses, {
            [classes.itemTextRTL]: props.rtlActive,
          })}
          disableTypography={true}
        />
      </ListItem>
    );

    return (
      <>
        {Array.isArray(route?.children) ? (
          <div
            className={activePro + classes.item}
            onClick={() => setIsShow(!isShow)}
          >
            <InnerItem />
          </div>
        ) : (
          <Link href={`${concatPath ?? ""}${route.path}`}>
            <a
              className={activePro + classes.item}
              style={{ paddingLeft: child && "1rem" }}
            >
              <InnerItem />
            </a>
          </Link>
        )}
      </>
    );
  };

  const links = (
    <List className={classes.list}>
      {routes.map((route, key) => (
        <div key={`parent-${key}`}>
          <Item route={route} />
          {Array.isArray(route?.children) &&
            isShow &&
            route.children.map((child, childKey) => (
              <div key={`child-${childKey}`}>
                <Item route={child} child={true} concatPath={route.path} />
              </div>
            ))}
        </div>
      ))}
    </List>
  );

  var brand = (
    <div className={classes.logo}>
      <a
        href="https://www.creative-tim.com?ref=njsmd-sidebar"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
        target="_blank"
      >
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf([
    "white",
    "purple",
    "blue",
    "green",
    "orange",
    "red",
  ]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
