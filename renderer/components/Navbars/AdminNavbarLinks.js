import React from "react";
import classNames from "classnames";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import router from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Button from "components/CustomButtons/Button.js";
import useWindowSize from "components/Hooks/useWindowSize.js";

import styles from "assets/jss/nextjs-material-dashboard/components/headerLinksStyle.js";

export default function AdminNavbarLinks(props) {
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { data: session, status } = useSession();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);

  const handleProfile = () => {
    setOpenProfile(null);
    router.push(`/user/${session?.user?.name?.userId}`);
  };

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    signOut();
  };

  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <MenuList role="menu">
                  <MenuItem
                    onClick={handleProfile}
                    className={classes.dropdownItem}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseProfile}
                    className={classes.dropdownItem}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
