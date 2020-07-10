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
import DashboardPage from "views/Dashboard/TesterDashboard.js";
import UserProfile from "views/UserProfile/TesterUserProfile.js";
import SearchProject from "views/SearchProject";
import ScheduleRun from "views/ScheduleRun";
import MyProjects from "views/MyProjects"
import RejectedProjects from "views/RejectedProjects"
import AppliedProjects from "views/AppliedProjects"
import Logout from "views/Logout"
// core components/views for RTL layout


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/tester"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/tester"
  },
  {
    path: "/searchproject",
    name: "Search Project",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "search",
    component: SearchProject,
    layout: "/tester"
  },
  {
    path: "/schedulerun",
    name: "Schedule Test Run",
    rtlName: "قائمة الجدول",
    icon: "add_to_queue",
    component: ScheduleRun,
    layout: "/tester"
  },
  {
    path: "/myprojects",
    name: "My Projects",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: MyProjects,
    layout: "/tester"
  },
  {
    path: "/myrejected",
    name: "My Rejected Projects",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: RejectedProjects,
    layout: "/tester"
  },
  {
    path: "/myapplied",
    name: "My Applied Projects",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: AppliedProjects,
    layout: "/tester"
  },  
  {
    path: "/logout",
    name: "Logout",
    rtlName: "قائمة الجدول",
    icon: "power_settings_new",
    component: Logout,
    layout: "/tester"
  }, 
  
  
  
  

];

export default dashboardRoutes;
