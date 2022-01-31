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
    path: "/admin/table-list",
    name: "Table List",
    icon: "content_paste",
  },
  {
    path: "/admin/typography",
    name: "Typography",
    icon: LibraryBooks,
  },
  {
    path: "/admin/icons",
    name: "Icons",
    icon: BubbleChart,
  },
  {
    path: "/user",
    name: "Users",
    icon: GroupIcon,
  },
];

export default dashboardRoutes;
