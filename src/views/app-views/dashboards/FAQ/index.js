import React, { useState, useEffect } from "react";
import {
  Button,
  message,
  Input,
  Row,
  Col,
  Card,
  Form,
  Select,
  Switch,
  notification,
  Radio,
} from "antd";
import masterService from "services/MasterService";
import { useNavigate } from "react-router-dom";
import userService from "services/UserServoce";
import { initInputToken } from "antd/es/input/style";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { MonthPicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";
const ADD = "ADD";
const EDIT = "EDIT";
const { Option } = Select;
const EmployeeDetailForm = (props) => {
  const { mode = ADD, employee_id } = props;
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [countryList, setEmployeeList] = useState([]);
  const [statusShow, setStatusShow] = useState(false);
  const [fileChanges, setFilechanges] = useState("");
  const [listdesignation, setlistdesignationAll] = useState([]);
  const [listdepartment, setlistdepartmentAll] = useState([]);
  const [listrole, setlistroleAll] = useState([]);
  const [initialVal, setInitialVal] = useState({
    employee_id: " ",
    marital_status: "",
    gender: "",
    date_of_birth: "",
    role_id: 2,
    last_name: "",
    name: "",
    mobile: "",
    department_id: "",
    designation_id: "",
    password: "",
    address: "",
    email: "",
    is_active: "",
  });

  const [form] = Form.useForm();

  const EmployeeData = () => {
    //console.log(employee_id)

    const reqeustParam = { employee_id: employee_id };
    try {
      const resp = userService.showUser(reqeustParam); ////   1
      resp
        .then((res) => {
          //console.log(res.data);
          setInitialVal(res.data); // 2
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };
  const listroledata = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getrole(reqeustParam);
      resp
        .then((res) => {
          //console.log(res)

          setlistroleAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };
  const listDatas = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getDesignation(reqeustParam);
      resp
        .then((res) => {
          setlistdesignationAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };
  const listDepartmentdata = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getDepartment(reqeustParam);
      resp
        .then((res) => {
          //console.log(res)

          setlistdepartmentAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    //EmployeeData()
    listroledata();
    listDatas();
    listDepartmentdata();

    if (mode == "EDIT") {
      //EmployeeData()
      //console.log(initialVal)
      const reqeustParam = { employee_id: employee_id };
      const resp = userService.showUser(reqeustParam); ////   1
      resp
        .then((res) => {
          //console.log(res.data);
          form.setFieldsValue({
            name: res.data.name,
            mobile: res.data.mobile,
            email: res.data.email,
            department_id: res.data.department_id,
            designation_id: res.data.designation_id,
            role_id: res.data.role_id,
            address: res.data.address,
            date_of_joining: res.data.date_of_joining,
            last_name: res.data.last_name,
            date_of_birth: res.data.date_of_birth,
            gender: res.data.gender,
            marital_status: res.data.marital_status,
            is_active: res.data.is_active,
          });
        })
        .catch((err) => {});
    }
  }, []);

  const onFinish = () => {
    //event.preventDefault();
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        //console.log(statusShow);
        setTimeout(() => {
          let statusActive;
          statusShow == true ? (statusActive = 1) : (statusActive = 0);

          //console.log(statusActive)
          const data = new FormData();
          data.append("name", values.name);
          data.append("mobile", values.mobile);
          data.append("email", values.email);
          data.append("address", values.address);
          data.append("role_id", values.role_id ?? 2);
          data.append("designation_id", values.designation_id);
          data.append("department_id", values.department_id);
          data.append("password", values.password);
          data.append("date_of_joining", values.date_of_joining);
          data.append("last_name", values.last_name);
          data.append("date_of_birth", values.date_of_birth);
          data.append("gender", values.gender);
          data.append("marital_status", values.marital_status);
          data.append("is_active", statusActive);
          if (mode === ADD) {
            const resp = userService.addUser(data);
            resp
              .then((res) => {
                if (res.status === 200) {
                  form.resetFields();
                  notification.success({
                    message: "Employee successfully added.",
                  });
                  navigate("../dashboards/user");
                }
              })
              .catch((err) => {});
            setSubmitLoading(false);
          }
          if (mode === EDIT) {
            data.append("employee_id", employee_id);
            const resp = userService.editUser(data);
            resp
              .then((res) => {
                if (res.status === 200) {
                  form.resetFields();
                  notification.success({ message: "Employee updated added." });
                  navigate("../dashboards/user-view/:employee_id");
                }
              })
              .catch((err) => {});
            setSubmitLoading(false);
          }
        }, 1500);
      })
      .catch((info) => {
        setSubmitLoading(false);
        //console.log('info', info);
        message.error("Please enter all required fields.");
      });
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };
  const inputChange = (name, id) => (e) => {
    let value = e.target ? e.target.value : e;
    setInitialVal({ ...initialVal, [name]: value });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="addemployee"
        className="ant-advanced-search-form"
        inputChange
        initialValues={{
          name: initialVal.name,
          mobile: initialVal.mobile,
          email: initialVal.email,
          department_id: initialVal.department_id,
          designation_id: initialVal.designation_id,
          role_id: initialVal.role_id,
          address: initialVal.address,
          date_of_joining: initialVal.date_of_joining,
          last_name: initialVal.last_name,
          date_of_birth: initialVal.date_of_birth,
          gender: initialVal.gender,
          marital_status: initialVal.marital_status,
          is_active: initialVal.is_active,
        }}
      >
        <div className="container123">
          <Card title={`Employee ${mode}`}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  name="role_id"
                  label="Role "
                  rules={[
                    {
                      required: false,
                      message: "Please enter role !",
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={inputChange("role_id")}
                    value={initialVal.role_id}
                  >
                    {listrole &&
                      listrole.map((listrolesType) => (
                        <Radio value={listrolesType.id}>
                          {listrolesType.name}
                        </Radio>
                      ))}
                  </Radio.Group>
                  {/* <Radio value={listrolesType.id}>{listrolesType.name}</Radio> */}
                  {/* <Select
                                        onChange={inputChange("role_id")}
                                        showSearch
 
 
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {listrole &&
                                            listrole.map((listrolesType) => (
                                                <Option key={listrolesType.id} value={listrolesType.id}>
                                                    {listrolesType.name}
                                                </Option>
                                            ))}
                                    </Select>
                                            */}
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  name="designation_id"
                  label="Designation "
                  rules={[
                    {
                      required: true,
                      message: "Please enter Designation !",
                    },
                  ]}
                >
                  <Select
                    onChange={inputChange("designation_id")}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {listdesignation &&
                      listdesignation.map((listDesignationsType) => (
                        <Option
                          key={listDesignationsType.id}
                          value={listDesignationsType.id}
                        >
                          {listDesignationsType.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  label="Department "
                  name="department_id"
                  rules={[
                    {
                      required: true,
                      message: "Please enter department id!",
                    },
                  ]}
                >
                  <Select
                    onChange={inputChange("department_id")}
                    showSearch
                    placeholder="Select department Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {listdepartment &&
                      listdepartment.map((listdepartmentsType) => (
                        <Option
                          key={listdepartmentsType.id}
                          value={listdepartmentsType.id}
                        >
                          {listdepartmentsType.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  name="date_of_joining"
                  label="Joining Date"
                  rules={[
                    {
                      required: true,
                      message: "Please enter name!",
                    },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs("2015/01/01", dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} gap={3}>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  name="name"
                  label="Employee First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter First name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  name="last_name"
                  label="Employee Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Last name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  name="mobile"
                  label="Mobile No."
                  rules={[
                    {
                      required: true,
                      message: "Please enter Mobile Number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter email!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  name="date_of_birth"
                  label="D.O.B"
                  rules={[
                    {
                      required: true,
                      message: "Please enter date!",
                    },
                  ]}
                >
                  <DatePicker
                    defaultValue={dayjs(" ", dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Gender!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={6}>
                <Form.Item
                  name="marital_status"
                  label="Maritial Status"
                  rules={[
                    {
                      required: true,
                      message: "Please enter marital status!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              {mode == "ADD" ? (
                <Col xs={24} sm={24} md={6}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter password!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Col>
              ) : (
                ""
              )}
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Address!",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Status" name="is_active">
                  <Switch onChange={statusOnChange} checked={statusShow} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitLoading}
                  onClick={() => onFinish()}
                >
                  {mode === "ADD" ? "Submit" : `Save`}
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </Form>
    </>
  );
};

export default EmployeeDetailForm;
