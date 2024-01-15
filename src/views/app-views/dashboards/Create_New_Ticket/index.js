import React, { useState, useEffect, elm } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Button,
  Tooltip,
  Tag,
  Modal,
  Form,
  Switch,
  notification,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import {} from "react-router-dom";
import utils from "utils";
import masterService from "../../../../services/MasterService";
import { useSelector } from "react-redux";
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

  form.setFieldsValue({
    id: initialVal.id,
    ticket_number: initialVal.ticket_number,

    subject: initialVal.subject,
    department_id: initialVal.department_id,
    category_id: initialVal.category_id,
    description: initialVal.description,
    Status: initialVal.code,
  });

  return (
    <Modal
      destroyOnClose={true}
      title={initialVal.id > 0 ? "Add Ticket" : "Add New Ticket"}
      open={visible}
      okText="Submit"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      {/* <Form */}
      preserve={false}
      form={form}
      name="addTicket" layout="vertical" initialValues=
      {{
        id: initialVal.id,
        ticket_number: initialVal.ticket_number,

        subject: initialVal.subject,
        department_id: initialVal.department_id,
        category_id: initialVal.category_id,
        assigned_to: initialVal.assigned_to,

        Status: initialVal.code,
      }}
      <Form.Item
        label="Subject"
        name="subject"
        rules={[
          {
            required: true,
            message: "Please enter Subject!",
          },
        ]}
      >
        <Input
          placeholder="Name"
          onChange={inputChange("subject", initialVal.id)}
        />
      </Form.Item>
      <Form.Item
        label="Department"
        name="department"
        rules={[
          {
            required: true,
            message: "Please enter Department!",
          },
        ]}
      >
        <Input
          placeholder="Department"
          onChange={inputChange("department", initialVal.id)}
        />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: "Please enter Category!",
          },
        ]}
      >
        <Input
          placeholder="Category"
          onChange={inputChange("category", initialVal.id)}
        />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please enter Description!",
          },
        ]}
      >
        <Input
          placeholder="Description"
          onChange={inputChange("description", initialVal.id)}
        />
      </Form.Item>
      <Form.Item label=" Active" name="statusName">
        <Switch onChange={statusOnChange} checked={statusShow} />
      </Form.Item>
      {/* </Form> */}
    </Modal>
  );
};

const ConfirmationBox = ({ id, visible }) => {
  return (
    <Modal
      destroyOnClose={true}
      title="Ticket"
      open={visible}
      okText="OK"
      //   onCancel={onCancelConfirm}
      onOk={() => {
        // onOKConfirm();
      }}
    >
      Are you sure want to delete this item?
    </Modal>
  );
};

const Ticketlist = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({ id: "", name: "", code: "" });
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
      title: "Category",
      dataIndex: ["category", "name"],
      sorter: (a, b) => utils.antdTableSorter(a, b, ["category", "name"]),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => utils.antdTableSorter(a, b, "description"),
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (status) => (
        <Tag className="text-capitalize" color={status === 1 ? "cyan" : "red"}>
          {status === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "is_active"),
    },
    // {
    //   title: "Action",
    //   dataIndex: "actions",
    //   render: (_, elm) => (
    //     <Flex>
    //       {/* {btnShowHide.edit > 0 && (
    //         <Tooltip title="Edit">
    //           <Button
    //             type="primary"
    //             className="mr-2"
    //             icon={<EditOutlined />}
    //             onClick={() => {
    //               showEditVaue(elm);
    //             }}
    //             size="small"
    //           />
    //         </Tooltip>
    //       )} */}
    //       {/* {btnShowHide.delete > 0 && (
    //         // <Tooltip title="Delete">
    //         //   <Button
    //         //     danger
    //         //     icon={<DeleteOutlined />}
    //         //     onClick={() => {
    //         //       deleteTicket(elm.id);
    //         //     }}
    //         //     size="small"
    //         //   />
    //         // </Tooltip>
    //       )} */}
    //     </Flex>
    //   ),
    // },
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
      subject: "",
      department_id: "",
      category_id: "",
      description: "",
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
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const reqeustParam = {
        ticket_number: values.ticket_number,
        assigned_to: values.assigned_to,
        department_id: values.department_id,
        category_id: values.category_id,
        priority_id: values.priority_id,
        subject: values.subject,
        description: values.description,
        is_active: ticketstatus,
      };
      const resp = masterService.getTicket(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "Ticket added successfully." });
          setInitialVal({
            id: "",
            ticket_number: "",
            assigned_to: "",
            department_id: "",
            category_id: "",
            priority_id:"",
            subject:"",
            description:""

          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    }
  };

  // const showEditVaue = (elm) => {
  //   let statustype = elm.is_active === 1 ? true : false;
  //   setInitialVal({ id: elm.id, name: elm.name, code: elm.code });
  //   setStatusShow(statustype);

  //   showModal();
  // };

  // const deleteCountry = (elm) => {
  //   setInitialId(elm);
  //   setModalVisibleConfirmation(true);
  // };

  // const onCancelConfirm = () => {
  //   setInitialId(0);
  //   setModalVisibleConfirmation(false);
  // };

  // const onOKConfirm = () => {
  //   const reqeustParam = { country_id: initialId };
  //   const resp = masterService.deleteCountry(reqeustParam);
  //   resp
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setModalVisibleConfirmation(false);
  //         listData();
  //         notification.success({
  //           message: "Country deleted successfully.",
  //         });
  //       }
  //     })
  //     .catch((err) => {});
  // };

  const inputChange = (name, id) => (e) => {
    setInitialVal({
      id: id,
      [name]: e.target.value,
    });
  };

  var i = 1;

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
      <ConfirmationBox
        id={initialId}
        visible={modalVisibleConfirmation}
        // onOKConfirm={onOKConfirm}
        // onCancelConfirm={onCancelConfirm}
      />
      <div className="table-responsive">
        <Table key={i++} columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default Ticketlist;
