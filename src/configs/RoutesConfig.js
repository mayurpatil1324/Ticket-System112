import React from "react";
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from "configs/AppConfig";

export const publicRoutes = [
  {
    key: "login",
    path: `${AUTH_PREFIX_PATH}/login`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/login")
    ),
  },
  {
    key: "register",
    path: `${AUTH_PREFIX_PATH}/register`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/register")
    ),
  },
  {
    key: "forgot-password",
    path: `${AUTH_PREFIX_PATH}/forgot-password`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/forgot-password")
    ),
  },
  {
    key: "reset-password",
    path: `${AUTH_PREFIX_PATH}/reset-password`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/reset-password")
    ),
  },
];

export const protectedRoutes = [
  {
    key: "dashboard.default",
    path: `${APP_PREFIX_PATH}/dashboards/default`,
    component: React.lazy(() => import("views/app-views/dashboards/default")),
  },

  {
    key: "dashboard.department",
    path: `${APP_PREFIX_PATH}/dashboards/department`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/Master/Department/index")
    ),
  },
  {
    key: "dashboard.category",
    path: `${APP_PREFIX_PATH}/dashboards/category`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/Master/Category/index")
    ),
  },
  {
    key: "dashboard.priority",
    path: `${APP_PREFIX_PATH}/dashboards/priority`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/Master/Priority")
    ),
  },

  {
    key: "dashboard.create_ticket",
    path: `${APP_PREFIX_PATH}/dashboards/create_ticket`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/Create_New_Ticket/index")
    ),
  },
  {
    key: "dashboard.createticket",
    path: `${APP_PREFIX_PATH}/dashboards/create_ticket/create/`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/Create_New_Ticket/ticketform")
    ),
  },
  {
    key: "dashboard.ticket_status",
    path: `${APP_PREFIX_PATH}/dashboards/ticket_status`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/TicketStatus/index")
    ),
  },
  {
    key: "dashboard.reassigneticket",
    path: `${APP_PREFIX_PATH}/dashboards/reassigneticket`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/Re Assigne dticket/index")
    ),
  },
  {
    key: "dashboard.reopenticket",
    path: `${APP_PREFIX_PATH}/dashboards/reopenticket`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/Re open ticket/index")
    ),
  },
  {
    key: "dashboard.faq",
    path: `${APP_PREFIX_PATH}/dashboards/faq`,
    component: React.lazy(() => import("views/app-views/dashboards/FAQ/index")),
  },
];
