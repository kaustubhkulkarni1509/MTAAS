/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import CreateProject from "views/CreateProject.js";
import PendingRequest from "views/PendingRequest.js"
import Billing from "views/Billing.js"
import Logout from "views/Logout"
import ManagerMyProjects from "views/ManagerMyProjects"
import TestInfoManager from "views/TestInfoManager"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/createproject",
    name: "Create Project",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: CreateProject,
    layout: "/admin"
  },
  {
    path: "/pendingrequest",
    name: "Pending Applications",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: PendingRequest,
    layout: "/admin"
  },
  
  {
    path: "/managermyprojects",
    name: "My Projects",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: ManagerMyProjects,
    layout: "/admin"
  },
  {
    path: "/payments",
    name: "Billing for the Projects",
    rtlName: "قائمة الجدول",
    icon: "payment",
    component: Billing,
    layout: "/admin"
  },
  {
    path: "/testinfo",
    name: "Test Information",
    rtlName: "قائمة الجدول",
    icon: "timeline",
    component: TestInfoManager,
    layout: "/admin"
  },
  {
    path: "/logout",
    name: "Logout",
    rtlName: "قائمة الجدول",
    icon: "power_settings_new",
    component: Logout,
    layout: "/admin"
  }

];

export default dashboardRoutes;
