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
      import("views/app-views/dashboards/Master/department/index")
    ),
  },
  {
    key: "dashboard.category",
    path: `${APP_PREFIX_PATH}/dashboards/category`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/Master/category")
    ),
  },
  {
    key: "dashboard.priority",
    path: `${APP_PREFIX_PATH}/dashboards/priority`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/Master/priority")
    ),
  },
  {
    key: "dashboard.assettype",
    path: `${APP_PREFIX_PATH}/dashboards/assettype`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/assettype/index")
    ),
  },

  {
    key: "dashboard.asset",
    path: `${APP_PREFIX_PATH}/dashboards/userasset`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/User_Asset/index")
    ),
  },

  {
    key: "dashboard.form",
    path: `${APP_PREFIX_PATH}/dashboards/userasset/:user_id`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/User_Asset/form")
    ),
  },

  {
    key: "dashboard.create_ticket",
    path: `${APP_PREFIX_PATH}/dashboards/create_ticket`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/create_new_ticket/index")
    ),
  },
  {
    key: "dashboard.createticket",
    path: `${APP_PREFIX_PATH}/dashboards/create_ticket/create/`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/create_new_ticket/ticketform")
    ),
  },
  {
    key: "dashboard.ticketstatus",
    path: `${APP_PREFIX_PATH}/dashboards/ticketstatus`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/ticketstatus/index")
    ),
  },
  {
    key: "dashboard.reassigneticket",
    path: `${APP_PREFIX_PATH}/dashboards/reassigneticket`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/reassigneticket/index")
    ),
  },
  {
    key: "dashboard.reopenticket",
    path: `${APP_PREFIX_PATH}/dashboards/reopenticket`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/reopenticket/index")
    ),
  },
  {
    key: "dashboard.faq",
    path: `${APP_PREFIX_PATH}/dashboards/faq`,
    component: React.lazy(() => import("views/app-views/dashboards/faq/index")),
  },
];
