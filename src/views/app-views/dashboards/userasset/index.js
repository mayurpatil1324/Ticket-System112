import React, { useState, useEffect } from "react";
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
  DatePicker,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Flex from "components/shared-components/Flex";
import { useNavigate } from "react-router-dom";
import {} from "react-router-dom";
import utils from "utils";
import masterService from "../../../../services/MasterService";
import { useSelector } from "react-redux";
const { MonthPicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

const AddNewCardForm = ({
  visible,
  onCreate,
  onCancel,
  statusOnChange,
  onCancelConfirmExp,
  statusShow,
  initialVal,
  inputChange,
}) => {
  const [form] = Form.useForm();

  form.setFieldsValue({
    id: initialVal.id,
    name: initialVal.name,
    email: initialVal.email,
    mobile: initialVal.mobile,
    statusName: statusShow,
  });

  return (
    <Modal
      destroyOnClose={true}
      title="Add Experience"
      open={visible}
      okText="Submit"
      onCancel={onCancelConfirmExp}
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
      <Form
        preserve={false}
        form={form}
        name="addExperience"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          name: initialVal.name,
          email: initialVal.email,
          mobile: initialVal.mobile,
          statusName: statusShow,
        }}
      >
        <Form.Item
          label="Company Name"
          name="company_name"
          rules={[
            {
              required: true,
              message: "Please enter company name!",
            },
          ]}
        >
          <Input
            placeholder="Company Name"
            onChange={inputChange("company_name", initialVal.company_name)}
          />
        </Form.Item>
        <Form.Item
          label="Position"
          name="position"
          rules={[
            {
              required: true,
              message: "Please enter postion!",
            },
          ]}
        >
          <Input
            placeholder="position"
            onChange={inputChange("position", initialVal.position)}
          />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="start_date"
          rules={[
            {
              required: true,
              message: "Please enter start date!",
            },
          ]}
        >
          <DatePicker
            defaultValue={dayjs("", dateFormat)}
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="end_date"
          rules={[
            {
              required: true,
              message: "Please enter End date!",
            },
          ]}
        >
          <DatePicker
            defaultValue={dayjs("", dateFormat)}
            format={dateFormat}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ConfirmationBox = ({ id, visible, onOKConfirm, onCancelConfirm }) => {
  return (
    <Modal
      destroyOnClose={true}
      title="Department"
      open={visible}
      okText="OK"
      onCancel={onCancelConfirm}
      onOk={() => {
        onOKConfirm();
      }}
    >
      Are you sure want to delete this item?
    </Modal>
  );
};

const Departmentlist = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
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
      const resp = masterService.getUser(reqeustParam);
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
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "User Name ",
      dataIndex: "name",

      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "email ",
      dataIndex: "email",

      sorter: (a, b) => utils.antdTableSorter(a, b, "email"),
    },
    {
      title: "mobile",
      dataIndex: "mobile",

      sorter: (a, b) => utils.antdTableSorter(a, b, "mobile"),
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
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => (
        <Flex>
          <Tooltip title="View">
            <Button
              className="mr-2 text-white bg-dark"
              icon={<EyeOutlined />}
              onClick={() => {
                viewUser(elm.id);
              }}
              size="small"
            />
          </Tooltip>
          {btnShowHide.edit > 0 && (
            <Tooltip title="Edit">
              <Button
                type="primary"
                className="mr-2"
                icon={<EditOutlined />}
                onClick={() => {
                  showEditVaue(elm);
                }}
                size="small"
              />
            </Tooltip>
          )}
          {btnShowHide.delete > 0 && (
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteDepartment(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          )}
        </Flex>
      ),
    },
  ];

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
    setInitialVal({ id: "", name: "" });
    setModalVisible(false);
    setStatusShow(false);
  };

  const viewUser = (user_id) => {
    navigate(`/dashboards/useraaa/${user_id}`);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addEditDepartment = (values) => {
    let departmentstatus = values.statusName === true ? 1 : 0;

    if (initialVal.id > 0) {
      const reqeustParam = {
        department_id: initialVal.id,
        name: values.name,

        is_active: departmentstatus,
      };
      const resp = masterService.editDepartment(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "Department updated successfully.",
          });
          setInitialVal({ id: "", name: "" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const reqeustParam = {
        name: values.name,

        is_active: departmentstatus,
      };
      const resp = masterService.addDepartment(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "Department added successfully." });
          setInitialVal({ id: "", name: "" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    }
  };

  const showEditVaue = (elm) => {
    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({ id: elm.id, name: elm.name });
    setStatusShow(statustype);

    showModal();
  };

  const deleteDepartment = (elm) => {
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };

  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { department_id: initialId };
    const resp = masterService.deleteDepartment(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Department Delete successfully.",
          });
        }
      })
      .catch((err) => {});
  };

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
              onClick={showModal}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Add Department
            </Button>
          )}
        </Col>
      </Row>
      <AddNewCardForm
        visible={modalVisible}
        onCreate={addEditDepartment}
        onCancel={closeModal}
        statusOnChange={statusOnChange}
        statusShow={statusShow}
        initialVal={initialVal}
        inputChange={inputChange}
      />
      <ConfirmationBox
        id={initialId}
        visible={modalVisibleConfirmation}
        onOKConfirm={onOKConfirm}
        onCancelConfirm={onCancelConfirm}
      />
      <div className="table-responsive">
        <Table key={i++} columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default Departmentlist;
