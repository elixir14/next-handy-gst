import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  darkCardHeader,
  whiteColor,
} from "renderer/assetsjss/nextjs-material-dashboard.js";

const cardSubHeaderStyle = {
  cardSubHeader: {
    padding: "8px 37px",
    borderRadius: "3px",
    marginTop: "30px",
    minWidth: "150px",
    boxShadow: "none !important",
  },

  warningCardSubHeader: {
    color: whiteColor,
    ...warningCardHeader,
  },
  successCardSubHeader: {
    color: whiteColor,
    ...successCardHeader,
  },
  dangerCardSubHeader: {
    color: whiteColor,
    ...dangerCardHeader,
  },
  infoCardSubHeader: {
    color: whiteColor,
    ...infoCardHeader,
  },
  primaryCardSubHeader: {
    color: whiteColor,
    ...primaryCardHeader,
  },
  roseCardSubHeader: {
    color: whiteColor,
    ...roseCardHeader,
  },
  darkCardSubHeader: {
    color: whiteColor,
    ...darkCardHeader,
  },
};

export default cardSubHeaderStyle;
