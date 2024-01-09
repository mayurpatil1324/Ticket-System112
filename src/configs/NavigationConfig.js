import {
  DashboardOutlined,
  
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";
// import { menu_items } from "mock/data/authData";

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    //submenu:menu_items,
    submenu: [
      {
        key: "dashboards-default",
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        title: "Dashboard",
        icon: "DashboardOutlined",
        breadcrumb: false,
        submenu: [],
      },

      {
        key: "dashboards-ticket",
        path:  `${APP_PREFIX_PATH}/dashboards/ticket`,
        title: "Ticket",
        icon: "OrderedListOutlined",
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
