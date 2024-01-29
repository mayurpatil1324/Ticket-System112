import { DashboardOutlined } from "@ant-design/icons";
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
        key: "dashboards-master",
        path: `${APP_PREFIX_PATH}/dashboards/master`,
        title: "Master",
        icon: "DashboardOutlined",
        breadcrumb: false,
        submenu: [
          {
            key: "dashboards-department",
            path: `${APP_PREFIX_PATH}/dashboards/department`,
            title: "Department",
            icon: "DashboardOutlined",
            breadcrumb: false,
            submenu: [],
          },
          // {
          //   key: "dashboards-category",
          //   path: `${APP_PREFIX_PATH}/dashboards/category`,
          //   title: "Category",
          //   icon: "DashboardOutlined",
          //   breadcrumb: false,
          //   submenu: [],
          // },
          // {
          //   key: "dashboards-priority",
          //   path: `${APP_PREFIX_PATH}/dashboards/priority`,
          //   title: "Priority",
          //   icon: "DashboardOutlined",
          //   breadcrumb: false,
          //   submenu: [],
          // },
          {
            key: "dashboards-assettype",
            path: `${APP_PREFIX_PATH}/dashboards/assettype`,
            title: "Asset",
            icon: "DashboardOutlined",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "dashboards-userasset",
        path: `${APP_PREFIX_PATH}/dashboards/userasset`,
        title: "User Asset",
        icon: "DashboardOutlined",
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboards-ticket",
        path: `${APP_PREFIX_PATH}/dashboards/ticket`,
        title: "Ticket",
        icon: "DashboardOutlined",
        breadcrumb: false,
        submenu: [
          {
            key: "dashboards-createticket",
            path: `${APP_PREFIX_PATH}/dashboards/create_ticket`,
            title: "New Ticket",
            icon: "OrderedListOutlined",
            breadcrumb: false,
            submenu: [],
          },
         
          // {
          //   key: "dashboards-ticketlist",
          //   path: `${APP_PREFIX_PATH}/dashboards/ticketlist`,
          //   title: "Ticket list",
          //   icon: "OrderedListOutlined",
          //   breadcrumb: false,
          //   submenu: [],
          // },
          // {
          //   key: "dashboards-reassigneticket",
          //   path: `${APP_PREFIX_PATH}/dashboards/reassigneticket`,
          //   title: "Re Assigne Ticket",
          //   icon: "OrderedListOutlined",
          //   breadcrumb: false,
          //   submenu: [],
          // },
          // {
          //   key: "dashboards-reopenticket",
          //   path: `${APP_PREFIX_PATH}/dashboards/reopenticket`,
          //   title: "Re Open Ticket",
          //   icon: "OrderedListOutlined",
          //   breadcrumb: false,
          //   submenu: [],
          // },
        ],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
