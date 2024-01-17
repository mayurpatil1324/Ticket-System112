import fetch from "auth/FetchMasterInterceptor";

const masterService = {};

// masterService.getCountry = function (data) {
//   return fetch({
//     url: "/country/list",
//     method: "post",
//     data: data,
//   });
// };
// masterService.addCountry = function (data) {
//   return fetch({
//     url: "/country/add",
//     method: "post",
//     data: data,
//   });
// };
// masterService.editCountry = function (data) {
//   return fetch({
//     url: "/country/update",
//     method: "post",
//     data: data,
//   });
// };
// masterService.deleteCountry = function (data) {
//   return fetch({
//     url: "/country/delete",
//     method: "post",
//     data: data,
//   });
// };
masterService.getUser = function (data) {
  return fetch({
    url: "/User/list",
    method: "post",
    data: data,
  });
};
masterService.addUser = function (data) {
  return fetch({
    url: "/User/add",
    method: "post",
    data: data,
  });
};



masterService.getDepartment = function (data) {
  return fetch({
    url: "/department/list",
    method: "post",
    data: data,
  });
};
masterService.addDepartment = function (data) {
  return fetch({
    url: "/department/add",
    method: "post",
    data: data,
  });
};
masterService.editDepartment = function (data) {
  return fetch({
    url: "/department/update",
    method: "post",
    data: data,
  });
};
masterService.deleteDepartment = function (data) {
  return fetch({
    url: "department/delete",
    method: "post",
    data: data,
  });
};


masterService.getCategory = function (data) {
  return fetch({
    url: "/category/list",
    method: "post",
    data: data,
  });
};
masterService.addCategory = function (data) {
  return fetch({
    url: "/category/add",
    method: "post",
    data: data,
  });
};
masterService.editCategory = function (data) {
  return fetch({
    url: "/category/update",
    method: "post",
    data: data,
  });
};
masterService.deleteCategory = function (data) {
  return fetch({
    url: "category/delete",
    method: "post",
    data: data,
  });
};



masterService.getPriority = function (data) {
  return fetch({
    url: "/priority/list",
    method: "post",
    data: data,
  });
};
masterService.addPriority = function (data) {
  return fetch({
    url: "/priority/add",
    method: "post",
    data: data,
  });
};
masterService.editPriority = function (data) {
  return fetch({
    url: "/priority/update",
    method: "post",
    data: data,
  });
};
masterService.deletePriority = function (data) {
  return fetch({
    url: "priority/delete",
    method: "post",
    data: data,
  });
};



masterService.getTicket = function (data) {
  return fetch({
    url: "/ticket/list",
    method: "post",
    data: data,
  });
};
masterService.addTicket = function (data) {
  return fetch({
    url: "/ticket/create",
    method: "post",
    data: data,
  });
};
masterService.editTicket = function (data) {
  return fetch({
    url: "/ticket/update",
    method: "post",
    data: data,
  });
};
masterService.deleteTicket = function (data) {
  return fetch({
    url: "ticket/delete",
    method: "post",
    data: data,
  });
};
masterService.getUser = function (data) {
  return fetch({
    url: "/user/list",
    method: "post",
    data: data,
  });
};

masterService.getPriority = function (data) {
  return fetch({
    url: "/priority/list",
    method: "post",
    data: data,
  });
};










masterService.getStatus = function (data) {
  return fetch({
    url: "/status/list",
    method: "post",
    data: data,
  });
};
masterService.addStatus = function (data) {
  return fetch({
    url: "/status/add",
    method: "post",
    data: data,
  });
};
masterService.editStatus = function (data) {
  return fetch({
    url: "/status/update",
    method: "post",
    data: data,
  });
};
masterService.deleteStatus = function (data) {
  return fetch({
    url: "status/delete",
    method: "post",
    data: data,
  });
};


masterService.getReassign = function (data) {
  return fetch({
    url: "list/reassign",
    method: "post",
    data: data,
  });
};
export default masterService;
