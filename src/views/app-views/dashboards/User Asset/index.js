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
  notification,
  Pagination,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { RiArrowLeftUpLine } from "react-icons/ri";

import { useNavigate } from "react-router-dom";
import utils from "utils";
import EmployeeDetailForm from "../user/UserForm/index";
import { useSelector } from "react-redux";
import userService from "services/UserServoce";
import masterService from "../../../../services/MasterService";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { MonthPicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";
const ConfirmationBox = ({ id, visible, onOKConfirm, onCancelConfirm }) => {
  return (
    <Modal
      destroyOnClose={true}
      title="Employee"
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

const AddNewCardForm = ({
  visible,
  onCreate,
  onCancelConfirmExp,
  initialVal,
  inputChange,
  statusShow,
}) => {
  const [form] = Form.useForm();

  // form.setFieldsValue({
  //   id: initialVal.id,
  //   company_name: initialVal.company_name,
  //   position: initialVal.position,
  //   start_date: initialVal.start_date,
  //   end_date: initialVal.end_date,
  //   statusName: statusShow,
  // });
  return (
    <>
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
            company_name: initialVal.company_name,
            position: initialVal.position,
            start_date: initialVal.start_date,
            end_date: initialVal.end_date,
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
    </>
  );
};
const UserList = () => {
  const [initialVal, setInitialVal] = useState({
    id: "",
    company_name: "",
    position: "",
    start_date: "",
    end_date: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [Explist, setExplist] = useState([]);
  const [statusShow, setStatusShow] = useState(false);
  const [modalVisibleConfirmation, setModalVisibleConfirmation] =
    useState(false);
  const [modalVisibleConfirmationExp, setModalVisibleConfirmationExp] =
    useState(false);
  const [initialId, setInitialId] = useState(0);
  const [record, setrecord] = useState(1);
  const [listAll, setListAll] = useState([]);
  const [btnShowHide, setBtnShowHide] = useState({
    add: 0,
    edit: 0,
    delete: 0,
    Experience: 0,
    course: 0,
  });
  const auth_details = JSON.parse(
    useSelector((state) => state.auth.auth_details)
  );
  const listData = (page, pageSize) => {
    const reqeustParam = { is_active: null };
    try {
      const resp = masterService.getUser(reqeustParam);
      resp
        .then((res) => {
          console.log(res);
          setrecord(parseInt(res.data.total));
          setList(res.data);
          setListAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };
  const nexPageData = (page, pageSize) => {
    listData(page, pageSize);
  };

  useEffect(() => {
    listData();
    setBtnShowHide({
      add: 1,
      edit: 1,
      delete: 1,
      Experience: 1,
    });
  }, []);

  const tableColumns = [
    // {
    //   title: "Sr. No.",
    //   render: (_, elm, index) => index + 1,
    // },
    // {
    //   title: "User Name ",
    //   dataIndex:[ 'user','name'],

    //   sorter: (a, b) => utils.antdTableSorter(a, b, [ 'user','name']),
    // },
    // {
    //   title: "Asset Name",
    //   dataIndex: ['asset','name'],

    //   sorter: (a, b) => utils.antdTableSorter(a, b,  ['asset','name']),
    // },
    
    // {
    //   title: "Code",
    //   dataIndex: "code",

    //   sorter: (a, b) => utils.antdTableSorter(a, b, "code"),
    // },
    // {
    //   title: "Assign Date",
    //   dataIndex: "assign_date",

    //   sorter: (a, b) => utils.antdTableSorter(a, b, "assign_date"),
    // },
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "User Name ",
      dataIndex:"name",

      sorter: (a, b) => utils.antdTableSorter(a, b,  "name",),
    },
    {
      title: "email ",
      dataIndex: "email",

      sorter: (a, b) => utils.antdTableSorter(a, b,  "email"),
    },
    
    {
      title: "mobile",
      dataIndex: "mobile",

      sorter: (a, b) => utils.antdTableSorter(a, b, "mobile"),
    },
    // {
    //   title: "role_id ",
    //   dataIndex: "role_id",

    //   sorter: (a, b) => utils.antdTableSorter(a, b, "role_id"),
    // },
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
                viewEmployee(elm.id);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="primary"
              className="mr-2"
              icon={<EditOutlined />}
              onClick={() => {
                editEmployee(elm.id);
              }}
              size="small"
            />
          </Tooltip>
          {/* <Tooltip title="Earning Statement">
            <Button
              type="primary"
              className="mr-2"
              icon={<EyeOutlined />}
              onClick={() => {
                EarningStatement(elm.id);
              }}
              size="small"
            />
          </Tooltip> */}
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteuser(elm.id);
              }}
              size="small"
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  const ExperienceDataModal = (elm) => {
    //console.log(elm)
    setInitialId(elm);
    setModalVisibleConfirmationExp(true);
  };
  const onCancelConfirmExp = () => {
    //setInitialId(0);
    setModalVisibleConfirmationExp(false);
  };
  const onOKConfirmExp = (employeeId) => {
    const reqeustParam = { employee_id: employeeId };
    // console.log(initialId)
    const resp = masterService.addUser(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmationExp(false);

          Explist(res.data);
          setExplist(res.data);
        }
      })
      .catch((err) => {});
  };

  const onSearch = (e) => {
    //console.log(e.currentTarget.value);
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? listAll : listAll;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };
  const deleteuser = (elm) => {
    //console.log(elm)
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };
  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };
  const onOKConfirm = () => {
    const reqeustParam = { employee_id: initialId };

    const resp = userService.deleteUser(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({ message: "Employee deleted successfully." });
        }
      })
      .catch((err) => {});
  };
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

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setInitialVal({
      id: "",
      company_name: "",
      position: "",
      start_date: "",
      end_date: "",
    });
    setModalVisible(false);
  };
  const inputChange = (name, id) => (e) => {
    console.log(initialVal);
    //console.log(e.target.value)
    let value = e.target.value;
    setInitialVal({ ...initialVal, [name]: value });
  };
  var i = 1;
  return (
    <Card>
      <Row gutter={16} className="justify-content-between mb-4">
        <Col className="text-end mb-2" xs={24} sm={24} md={18}>
          {btnShowHide.add > 0 && (
            <Button
              onClick={addEmployee}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Add Employee
            </Button>
          )}
        </Col>
        <Col className="text-end mb-2" xs={24} sm={24} md={6}>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={(e) => onSearch(e)}
          />
        </Col>
      </Row>
      <AddNewCardForm
        visible={modalVisibleConfirmationExp}
        onOKConfirmExp={() => onOKConfirmExp(initialId)}
        // onOKConfirmExp={onOKConfirmExp}
        onCancelConfirmExp={onCancelConfirmExp}
        initialVal={initialVal}
        inputChange={inputChange}
        statusShow={statusShow}
      />
      <ConfirmationBox
        id={initialId}
        visible={modalVisibleConfirmation}
        onOKConfirm={onOKConfirm}
        onCancelConfirm={onCancelConfirm}
      />
      <div className="table-responsive">
        <Table
          key={i++}
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          pagination={false}
        />
      </div>
      <div className="text-right mt-3">
        {/* <Pagination
          defaultCurrent={1}
          total={record}
          onChange={nexPageData}
          defaultPageSize={50}
          hideOnSinglePage
          // pageSizeOptions={[10, 50, 100, 500]}
        /> */}
      </div>
    </Card>
  );
};

export default UserList;
