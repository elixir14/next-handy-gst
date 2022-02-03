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
import { BubbleChart, LibraryBooks } from "@material-ui/icons";
import BusinessIcon from "@material-ui/icons/Business";
import Dashboard from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";

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
    icon: GroupIcon,
  },
  {
    path: "/outward-chalaan",
    name: "Outward Chalaan",
    icon: GroupIcon,
  },
  {
    path: "/master",
    name: "Masters",
    icon: GroupIcon,
    children: [
      {
        path: "/process",
        name: "Process",
        icon: GroupIcon,
      },
      {
        path: "/group",
        name: "Item groups",
        icon: GroupIcon,
      },
      {
        path: "/item",
        name: "Items",
        icon: GroupIcon,
      },
      {
        path: "/transport",
        name: "Transports",
        icon: GroupIcon,
      },
      {
        path: "/unit",
        name: "Units",
        icon: GroupIcon,
      },
      {
        path: "/city",
        name: "Cities",
        icon: GroupIcon,
      },
      {
        path: "/state",
        name: "States",
        icon: GroupIcon,
      },
    ],
  },
  {
    path: "/settings",
    name: "Settings",
    icon: GroupIcon,
  },
];

export default dashboardRoutes;
