import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Button,
  Tag,
  Modal,
  Form,
  Switch,
  notification,
  Tooltip,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import {
  DeleteOutlined,
  SwapOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import masterService from "../../../../services/MasterService";
import { useNavigate } from "react-router-dom";

const AddNewCardForm = ({
  visible,
  onCreate,
  onCancel,
  statusOnChange,
  statusShow,
  initialVal,
  inputChange,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      id: initialVal.id,
      ticket_number: initialVal.ticket_number,
      subject: initialVal.subject,
      department_id: initialVal.department_id,
      category_id: initialVal.category_id,
      description: initialVal.description,
      Status: initialVal.code,
    });
  }, [form, initialVal]);

  // return (
  //   <Modal
  //     destroyOnClose={true}
  //     title={initialVal.id > 0 ? "Add Ticket" : "Add New Ticket"}
  //     visible={visible}
  //     okText="Submit"
  //     onCancel={onCancel}
  //     onOk={() => {
  //       form
  //         .validateFields()
  //         .then((values) => {
  //           form.resetFields();
  //           onCreate(values);
  //         })
  //         .catch((info) => {
  //           console.log("Validate Failed:", info);
  //         });
  //     }}
  //   >
  //     <Form
  //       form={form}
  //       name="addTicket"
  //       layout="vertical"
  //       initialValues={{
  //         id: initialVal.id,
  //         ticket_number: initialVal.ticket_number,
  //         subject: initialVal.subject,
  //         department_id: initialVal.department_id,
  //         category_id: initialVal.category_id,
  //         assigned_to: initialVal.user_id,
  //         assigned_to: initialVal.user_id,
  //         description:initialVal.description,
  //         user_id: initialVal.user_id,
  //         Status: initialVal.code,
  //       }}
  //     >
  //       <Form.Item
  //         label="Subject"
  //         name="subject"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Please enter subject!",
  //           },
  //         ]}
  //       >
  //         <Input
  //           placeholder="Name"
  //           onChange={inputChange("subject", initialVal.id)}
  //         />
  //       </Form.Item>
  //       <Form.Item
  //         label="Department"
  //         name="department"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Please enter Department!",
  //           },
  //         ]}
  //       >
  //         <Input
  //           placeholder="Department"
  //           onChange={inputChange("department", initialVal.id)}
  //         />
  //       </Form.Item>
  //       <Form.Item
  //         label="Category"
  //         name="category"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Please enter Category!",
  //           },
  //         ]}
  //       >
  //         <Input
  //           placeholder="Category"
  //           onChange={inputChange("category", initialVal.id)}
  //         />
  //       </Form.Item>
  //       <Form.Item
  //         label="Description"
  //         name="description"
  //         rules={[
  //           {
  //             required: true,
  //             message: "Please enter Description!",
  //           },
  //         ]}
  //       >
  //         <Input
  //           placeholder="Description"
  //           onChange={inputChange("description", initialVal.id)}
  //         />
  //       </Form.Item>
  //       <Form.Item label=" Active" name="statusName">
  //         <Switch onChange={statusOnChange} checked={statusShow} />
  //       </Form.Item>
  //     </Form>
  //   </Modal>
  // );
};

const ConfirmationBox = ({ id, visible }) => {
  return (
    <Modal destroyOnClose={true} title="Ticket" visible={visible} okText="OK">
      Are you sure want to delete this item?
    </Modal>
  );
};

const Ticketlist = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({
    id: "",
    ticket_number: "",
    subject: "",
    department_id: "",
    category_id: "",
    description: "",
    code: "",
    user_id: "",
  });
  const [modalVisibleConfirmation, setModalVisibleConfirmation] =
    useState(false);
  const [initialId, setInitialId] = useState(0);
  const [listAll, setListAll] = useState([]);
  const [btnShowHide, setBtnShowHide] = useState({
    add: 0,
    edit: 0,
    delete: 0,
  });

  const listData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getTicket(reqeustParam);
      resp
        .then((res) => {
          setList(res.data);
          setListAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    listData();
    setBtnShowHide({ add: 1, edit: 1, delete: 1 });
  }, []);

  const addEmployee = () => {
    navigate(`/dashboards/user-add`);
  };
  const editEmployee = (id) => {
    navigate(`/dashboards/user-edit/${id} `);
  };

  const viewEmployee = (user_id) => {
    navigate(`/dashboards/userasset/${user_id}`);
  };

  const EarningStatement = (id) => {
    navigate(`/dashboards/add-earning-statement/${id}`);
  };

  const tableColumns = [
    {
      title: "Sr.no",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Ticket Number",
      dataIndex: "ticket_number",
      sorter: (a, b) => utils.antdTableSorter(a, b, "ticket_number"),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      sorter: (a, b) => utils.antdTableSorter(a, b, "subject"),
    },
    {
      title: "Department",
      dataIndex: ["department", "name"],
      sorter: (a, b) => utils.antdTableSorter(a, b, ["department", "name"]),
    },
    {
      title: "Status",
      dataIndex: ["status", "name"],
      sorter: (a, b) => utils.antdTableSorter(a, b, ["status", "name"]),
    },
    // {
    //   title: "Category",
    //   dataIndex: ["category", "name"],
    //   sorter: (a, b) => utils.antdTableSorter(a, b, ["category", "name"]),
    // },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   sorter: (a, b) => utils.antdTableSorter(a, b, "description"),
    // },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => (
        <Flex>
          {/* <Tooltip title="View">
            <Button
              className="mr-2 text-white bg-dark"
              icon={<EyeOutlined />}
              onClick={() => {
                viewEmployee(elm.id);
              }}
              size="small"
            />
          </Tooltip> */}

          <Tooltip title="Reassign">
            <Button
              className="mr-2 text-white bg-dark"
              type="danger"
              icon={<SwapOutlined />}
              onClick={() => {
                showEditVaue(elm);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Edit Status">
            <Button
              className="mr-2 text-white bg-dark"
              type="default"
              icon={<EditOutlined />}
              onClick={() => {}}
              size="small"
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  const addView = () => {
    navigate(`/dashboards/create_ticket/create`);
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? listAll : listAll;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setInitialVal({
      id: "",
      ticket_number: "",
      subject: "",
      department_id: "",
      category_id: "",
      description: "",
      code: "", // Assuming 'code' is a property of initialVal
      user_id: "", // Assuming 'user_id' is a property of initialVal
    });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addEditTicket = (values) => {
    let ticketstatus = values.statusName === true ? 1 : 0;

    if (initialVal.id > 0) {
      const reqeustParam = {
        Ticket_id: initialVal.id,
        subject: values.subject,
        department_id: values.department_id,
        category_id: values.category_id,
        description: values.description,
        is_active: ticketstatus,
      };
      const resp = masterService.editTicket(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "Ticket updated successfully.",
          });
          setInitialVal({
            id: "",
            subject: "",
            department_id: "",
            category_id: "",
            description: "",
            code: "", // Assuming 'code' is a property of initialVal
            user_id: "", // Assuming 'user_id' is a property of initialVal
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const reqeustParam = {
        ticket_number: values.ticket_number,
        user_id: values.user_id,
        assigned_to: values.assigned_to ?? 0,
        department_id: values.department_id ?? 0,
        category_id: values.category_id ?? 0,
        priority_id: values.priority_id ?? 0,
        subject: values.subject || "",
        description: values.description || "",
        is_active: ticketstatus,
      };

      const resp = masterService.getAssign(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "Ticket Assign successfully." });
          setInitialVal({
            id: "",
            ticket_number: "",
            user_id: "",
            assigned_to: "",
            department_id: "",
            category_id: "",
            priority_id: "",
            subject: "",
            description: "",
            is_active: ticketstatus,
            // code: "", // Assuming 'code' is a property of initialVal
            // user_id: "", // Assuming 'user_id' is a property of initialVal
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    }
  };

  const showEditVaue = (elm) => {
    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({
      id: elm.id,
      ticket_number: elm.ticket_number,
      user_id: elm.user_id,
      assigned_to: elm.assigned_to,
      department_id: elm.department_id,
      category_id: elm.category_id,
      priority_id: elm.priority_id,
      subject: elm.subject,
      description: elm.description,
    });
    setStatusShow(statustype);

    showModal();
  };

  const inputChange = (name, id) => (e) => {
    setInitialVal({
      id: id,
      [name]: e.target.value,
    });
  };

  return (
    <Card>
      <Row gutter={16} className="justify-content-between my-4">
        <Col className="text-end mb-2" xs={24} sm={24} md={6}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
          />
        </Col>
        <Col className="text-end mb-2" xs={24} sm={24} md={6}>
          {btnShowHide.add > 0 && (
            <Button
              onClick={() => {
                addView();
              }}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Add New Ticket
            </Button>
          )}
        </Col>
      </Row>
      <AddNewCardForm
        visible={modalVisible}
        // onCreate={addEditTicket}
        onCancel={closeModal}
        statusOnChange={statusOnChange}
        statusShow={statusShow}
        initialVal={initialVal}
        inputChange={inputChange}
      />
      <ConfirmationBox id={initialId} visible={modalVisibleConfirmation} />
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default Ticketlist;
