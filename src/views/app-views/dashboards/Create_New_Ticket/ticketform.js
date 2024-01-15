import React, { useState, useEffect } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import userService from "services/UserServoce";


import {
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
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
// import { userService } from "services/UserServoce";
import { initInputToken } from "antd/es/input/style";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { MonthPicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";
const ADD = "ADD";
const EDIT = "EDIT";
const { Option } = Select;
const EmployeeDetailForm = (props) => {
  const { mode = ADD, ticket_id } = props;
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [countryList, setEmployeeList] = useState([]);
  const [statusShow, setStatusShow] = useState(false);
  const [fileChanges, setFilechanges] = useState("");
  // const [listusered, setlistuserAll] = useState([]);
  const [listcategory, setlistcategoryAll] = useState([]);
  const [listpriority, setlistpriorityAll] = useState([]);
  const [listdepartment, setlistdepartmentAll] = useState([]);
  const [listuser, setlistuserAll] = useState([]);
  // const [listrole, setlistroleAll] = useState([]);
  const [initialVal, setInitialVal] = useState({
    assigned_to: "",
    department_id: "",
    category_id: "",
    priority_id: "",
    subject: "",
    description: "",
    // is_active: "",
  });

  const [formData, setFormData] = useState({
    requestDetails: "", // Add other properties as needed
  });

  const handleEditorChange = (value) => {
    setFormData({ ...formData, requestDetails: value });
  };

  const [form] = Form.useForm();

  // const EmployeeData = () => {
  //   //console.log(employee_id)

  //   const reqeustParam = { ticket_id: ticket_id };
  //   try {
  //     const resp = userService.showUser(reqeustParam); ////   1
  //     resp
  //       .then((res) => {
  //         //console.log(res.data);
  //         setInitialVal(res.data); // 2
  //       })
  //       .catch((err) => {});
  //   } catch (errors) {
  //     console.log(errors);
  //   }
  // };

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

  const listUserdata = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getUser(reqeustParam);
      resp
        .then((res) => {
          //console.log(res)

          setlistuserAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  const listCategorydata = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getCategory(reqeustParam);
      resp
        .then((res) => {
          //console.log(res)

          setlistcategoryAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  const listPrioritydata = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getPriority(reqeustParam);
      resp
        .then((res) => {
          //console.log(res)

          setlistpriorityAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    //EmployeeData()

    // listDatas();
    listPrioritydata();
    listDepartmentdata();
    listCategorydata();
    listUserdata();
  }, []);

  const onFinish = () => {
    //event.preventDefault();
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        console.log(statusShow);
        setTimeout(() => {
          let statusActive;
          statusShow == true ? (statusActive = 1) : (statusActive = 0);

          //console.log(statusActive)
          const data = new FormData();
          data.append("assigned_to", values.assigned_to);
          data.append("department_id", values.department_id);
          data.append("category_id", values.category_id);
          data.append("subject", values.subject);
          data.append("description", values.description);

          if (mode === ADD) {
            const resp = userService.addTicket(data);
            resp
              .then((res) => {
                if (res.status === 200) {
                  form.resetFields();
                  notification.success({
                    message: "Ticket successfully added.",
                    
                  });
                  navigate("/dashboards/create_ticket");
                }
              })
              .catch((err) => {});
            setSubmitLoading(false);
          }
          // if (mode === EDIT) {
          //   data.append("ticket_id", ticket_id);
          //   const resp = userService.editUser(data);
          //   resp
          //     .then((res) => {
          //       if (res.status === 200) {
          //         form.resetFields();
          //         notification.success({ message: "Ticket updated added." });
          //         navigate("/dashboards/create_ticket");
          //       }
          //     })
          //     .catch((err) => {});
          //   setSubmitLoading(false);
          // }
        }, );
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
  //   const addView = () => {
  //     navigate(`/dashboards/create_ticket`);
  // };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="addemployee"
        className="ant-advanced-search-form"
        inputChange
        initialValues={{
          assigned_to: initialVal.assigned_to,
          department_id: initialVal.department_id,
          category_id: initialVal.category_id,
          priority_id: initialVal.priority_id,
          subject: initialVal.subject,
          description: initialVal.description,

          // is_active: initialVal.is_active,
        }}
      >
        <div className="container123">
          {/* <Card title={`Employee ${mode}`}> */}
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="user"
                label="Assigned To "
                rules={[
                  {
                    required: true,
                    message: "Please enter Assigned To !",
                  },
                ]}
              >
                <Select
                  onChange={inputChange("user")}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listuser &&
                    listuser.map((listUsersType) => (
                      <Option key={listUsersType.id} value={listUsersType.id}>
                        {listUsersType.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={8}>
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
            <Col span={8}>
              <Form.Item
                label="Category "
                name="category_id"
                rules={[
                  {
                    required: true,
                    message: "Please enter Category !",
                  },
                ]}
              >
                <Select
                  onChange={inputChange("category_id")}
                  showSearch
                  placeholder="Select Category Name"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listcategory &&
                    listcategory.map((listcategorysType) => (
                      <Option
                        key={listcategorysType.id}
                        value={listcategorysType.id}
                      >
                        {listcategorysType.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Priority "
                name="priority_id"
                rules={[
                  {
                    required: true,
                    message: "Please enter Priority !",
                  },
                ]}
              >
                <Select
                  onChange={inputChange("priority_id")}
                  showSearch
                  placeholder="Select Priority Name"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listpriority &&
                    listpriority.map((listpriorityType) => (
                      <Option
                        key={listpriorityType.id}
                        value={listpriorityType.id}
                      >
                        {listpriorityType.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="user"
            label="Assigned To "
            rules={[
              {
                required: true,
                message: "Please enter Assigned To !",
              },
            ]}
          >
            <Select
              onChange={inputChange("user")}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {listuser &&
                listuser.map((listUsersType) => (
                  <Option key={listUsersType.id} value={listUsersType.id}>
                    {listUsersType.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="Subject"
            label="subject"
            rules={[
              {
                required: true,
                message: "Please enter subject!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Request Details" style={{ height: "200px" }}>
            <ReactQuill
              value={formData.requestDetails}
              onChange={handleEditorChange}
              className="custom-editor"
              style={{ height: "130px" }}
            />
          </Form.Item>
          <Form.Item label="Attach File">
            {/* <Upload {...uploadProps}> */}
            <Button icon={<UploadOutlined />} className="custom-upload-button">
              Upload File
            </Button>
            {/* </Upload> */}
          </Form.Item>

          {/* <Col xs={24} sm={24} md={12}>
              <Form.Item label="Status" name="is_active">
                <Switch onChange={statusOnChange} checked={statusShow} />
              </Form.Item>
            </Col> */}

          <Row justify="end">
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitLoading}
                onClick={() => onFinish()}
              >
                {mode === "ADD" ? "Submit" : `Save`}
              </Button>
              {/* <Button
                type="primary"
                htmlType="submit"
                loading={submitLoading}
                // onClick={() => {
                //   addView();
                // }}
              >
                {mode === "ADD" ? "Ticket Submit" : `Save`}
              </Button> */}
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

export default EmployeeDetailForm;
