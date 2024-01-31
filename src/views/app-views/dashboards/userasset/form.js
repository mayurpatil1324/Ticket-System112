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
  Descriptions,
  DatePicker,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";
import {} from "react-router-dom";
import utils from "utils";
import masterService from "../../../../services/MasterService";
import { useSelector } from "react-redux";

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

  // form.setFieldsValue({
  //   id: initialVal.id,
  //   assigned_by: initialVal.assigned_by,
  //   assigned_to: initialVal.assigned_to,
  //   asset_type_id: initialVal.asset_type_id,
  //   code: initialVal.code,
  //   assign_date: initialVal.assign_date,
  //   // statusName: statusShow,
  // });

  return (
    <Modal
      destroyOnClose={true}
      title={initialVal.id > 0 ? "Edit User Asset" : "Add New User Asset"}
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
      <Form
        preserve={false}
        form={form}
        name="addUserAsset"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          assigned_by: initialVal.assigned_by,
          assigned_to: initialVal.assigned_to,
          asset_type_id: initialVal.asset_type_id,
          code: initialVal.code,
          assign_date: initialVal.assign_date,
          // statusName: statusShow,
        }}
      >
        <Form.Item
          label="Assigned By"
          name="assigned_by"
          rules={[
            {
              required: true,
              message: "Please enter Assigned By!",
            },
          ]}
        >
          <Input
            placeholder="Assigned By"
            onChange={inputChange("assigned_by", initialVal.id)}
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="assigned_to"
          rules={[
            {
              required: true,
              message: "Please enter Name!",
            },
          ]}
        >
          <Input
            placeholder="Name"
            onChange={inputChange("assigned_to", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Model"
          name="asset_type_id"
          rules={[
            {
              required: true,
              message: "Please enter ID!",
            },
          ]}
        >
          <Input
            placeholder="ID"
            onChange={inputChange("asset_type_id", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Code"
          name="code"
          rules={[
            {
              required: true,
              message: "Please enter Code!",
            },
          ]}
        >
          <Input
            placeholder="Code"
            onChange={inputChange("code", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Assign Date"
          name="assign_date"
         
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Select Assign Date"
           
          />
        </Form.Item>

        {/* <Form.Item label=" Active" name="statusName">
          <Switch onChange={statusOnChange} checked={statusShow} />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

const ConfirmationBox = ({ id, visible, onOKConfirm, onCancelConfirm }) => {
  return (
    <Modal
      destroyOnClose={true}
      title="UserAsset"
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

const UserAsset = () => {
  const [list, setList] = useState([]);
  const { user_id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({
    id: "",
    assigned_by: "",
    assigned_to: "",
    asset_type_id: "",
    code: "",
    assign_date: "",
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
    const reqeustParam = { user_id: user_id };
    try {
      const resp = masterService.showUser(reqeustParam);
      resp
        .then((res) => {
          setUserData(res.data);
          setList(res.data.userasset);
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

  // const listDataa = () => {
  //   const reqeustParam = {};
  //   try {
  //     const resp = masterService.getUserAsset(reqeustParam);
  //     resp
  //       .then((res) => {
  //         setList(res.data);
  //         setListAll(res.data);
  //       })
  //       .catch((err) => {});
  //   } catch (errors) {
  //     console.log(errors);
  //   }
  // };
  
  // useEffect(() => {
  //   listDataa();
  //   setBtnShowHide({ add: 1, edit: 1, delete: 1 });
  // }, []);

  const tableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
   
    {
      title: "Name",
      dataIndex: ["assigned_to","name"],
      sorter: (a, b) => utils.antdTableSorter(a, b, ["assigned_to","name"]),
    },
    {
      title: "Model",
      dataIndex: ["asset","name"],
      sorter: (a, b) => utils.antdTableSorter(a, b, ["asset","name"]),
    },
    {
      title: "Type",
      dataIndex: ["asset","type"],
      sorter: (a, b) => utils.antdTableSorter(a, b, ["asset","type"]),
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a, b) => utils.antdTableSorter(a, b, "code"),
    },
    {
      title: "Assign Date",
      dataIndex: "assign_date",
      sorter: (a, b) => utils.antdTableSorter(a, b, "assign_date"),
    },
    {
      title: "Assigned By",
      dataIndex: ["assigned_by","name"],
      sorter: (a, b) => utils.antdTableSorter(a, b, ["assigned_by","name"]),
    },

    // {
    //   title: "Status",
    //   dataIndex: "is_active",
    //   render: (status) => (
    //     <Tag className="text-capitalize" color={status === 1 ? "cyan" : "red"}>
    //       {status === 1 ? "Active" : "Inactive"}
    //     </Tag>
    //   ),
    //   sorter: (a, b) => utils.antdTableSorter(a, b, "is_active"),
    // },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => (
        <Flex>
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
                  deleteUserAsset(elm.id);
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
    setInitialVal({
      id: "",
      assigned_by: "",
      assigned_to: "",
      asset_type_id: "",
      code: "",
      assign_date: "",
    });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addEditUserAsset = (values) => {
    let userassetstatus = values.statusName === true ? 1 : 0;

    if (initialVal.id > 0) {
      const reqeustParam = {
        user_asset_id: initialVal.id,
        assigned_by: values.assigned_by,
        assigned_to: values.assigned_to,
        asset_type_id: values.asset_type_id,
        code: values.code,
        assign_date: values.assign_date,

        is_active: userassetstatus,
      };
      const resp = masterService.editUserA(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "User Asset updated successfully.",
          });
          setInitialVal({
            id: "",
            assigned_by: "",
            assigned_to: "",
            asset_type_id: "",
            code: "",
            assign_date: "",
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const reqeustParam = {
        assigned_by: values.assigned_by,
        assigned_to: values.assigned_to,
        asset_type_id: values.asset_type_id,
        code: values.code,
        assign_date: values.assign_date,

        is_active: userassetstatus,
      };
      const resp = masterService.addUserA(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "UserAsset added successfully." });
          setInitialVal({
            id: "",
            assigned_by: "",
            assigned_to: "",
            asset_type_id: "",
            code: "",
            assign_date: "",
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
      assigned_by: elm.assigned_by,
      assigned_to: elm.assigned_to,
      asset_type_id: elm.asset_type_id,
      code: elm.code,
      assign_date: elm.assign_date,
    });
    setStatusShow(statustype);

    showModal();
  };

  const deleteUserAsset  = (elm) => {
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };

  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { user_asset_id: initialId };
    const resp = masterService.deleteUserAsset(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Asset Delete successfully.",
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
    <div>
      <Card
        title="User Details"
        extra={
          <Tag color={userData.is_active ? "success" : "error"}>
            {userData.is_active ? "Active" : "Inactive"}
          </Tag>
        }
        style={{
          marginBottom: "16px",

          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f8f8f8",
        }}
      >
        <Descriptions bordered>
          <Descriptions.Item label="ID" span={3}>
            {userData.id}
          </Descriptions.Item>
          <Descriptions.Item label="Name" span={3}>
            {userData.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {userData.email}
          </Descriptions.Item>
          <Descriptions.Item label="Mobile" span={2}>
            {userData.mobile}
          </Descriptions.Item>
        </Descriptions>
      </Card>

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
                Add User Asset
              </Button>
            )}
          </Col>
        </Row>
        <AddNewCardForm
          visible={modalVisible}
          onCreate={addEditUserAsset}
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
          <Table
            key={i++}
            columns={tableColumns}
            dataSource={list}
            rowKey="id"
          />
        </div>
      </Card>
    </div>
  );
};

export default UserAsset;
