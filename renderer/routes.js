/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import InputIcon from "@material-ui/icons/Input";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ReceiptIcon from "@material-ui/icons/Receipt";
import CasinoIcon from "@material-ui/icons/Casino";

const dashboardRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: Dashboard,
  },
  {
    path: "/user",
    name: "Users",
    icon: GroupIcon,
  },
  {
    path: "/supplier",
    name: "Supplier",
    icon: TransferWithinAStationIcon,
  },
  {
    path: "/outward-chalaan",
    name: "Outward Chalaan",
    icon: ReceiptIcon,
  },
  {
    path: "/master",
    name: "Masters",
    icon: InputIcon,
    children: [
      {
        path: "/process",
        name: "Process",
        icon: CasinoIcon,
      },
      {
        path: "/group",
        name: "Item groups",
        icon: SupervisedUserCircleIcon,
      },
      {
        path: "/item",
        name: "Items",
        icon: LocalMallIcon,
      },
      {
        path: "/transport",
        name: "Transports",
        icon: EmojiTransportationIcon,
      },
      {
        path: "/unit",
        name: "Units",
        icon: ShoppingBasketIcon,
      },
      {
        path: "/city",
        name: "Cities",
        icon: LocationCityIcon,
      },
      {
        path: "/state",
        name: "States",
        icon: LocationCityIcon,
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: SettingsApplicationsIcon,
  },
];

export default dashboardRoutes;
