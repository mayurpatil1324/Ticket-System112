import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Modal,
  Row,
  Switch,
  Table,
  Tag,
  Tooltip,
} from "antd";
import utils from "utils";
import masterService from "services/MasterService";
import { useParams } from "react-router-dom";
import Utils from "utils";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  SearchOutlined,

  EditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";

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
    name: initialVal.name,
    statusName: statusShow,
  });

  return (
    <Modal
      destroyOnClose={true}
      title={initialVal.id > 0 ? "Edit Department" : "Add New Department"}
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
        name="addDepartment"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          name: initialVal.name,
          is_active: statusShow,
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter Name!",
            },
          ]}
        >
          <Input
            placeholder="Name"
            onChange={inputChange("name", initialVal.id)}
          />
        </Form.Item>

        <Form.Item label=" Active" name="statusName">
          <Switch onChange={statusOnChange} checked={statusShow} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const UserInfo = () => {
  const { user_id } = useParams();
  const [list, setList] = useState([]);
  const [userData, setUserData] = useState({});
  const [listAll, setListAll] = useState([]);
  const [btnShowHide, setBtnShowHide] = useState({
    add: 0,
    edit: 0,
    delete: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);

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
  }, []);

  const AssettableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Product",
      dataIndex: ["asset", "name"],
      sorter: (a, b) => Utils.antdTableSorter(a, b, ["asset", "name"]),
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a, b) => Utils.antdTableSorter(a, b, "code"),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => (
        <Flex>
          <Tooltip title="Edit">
            <Button
              type="primary"
              className="mr-2"
              icon={<EditOutlined />}
              onClick={() => {
                showEditValue(elm);
              }}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteAsset(elm.id);
              }}
              size="small"
            />
          </Tooltip>
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
  const showEditValue = (elm) => {
    // Handle show edit value
  };

  const deleteAsset = (elmId) => {
    // Handle delete asset
  };

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

      <Card
        title="User Assets"
        style={{
          marginBottom: "16px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f8f8f8",
        }}
        // extra={
        //   <Tooltip title="Add New Asset">
        //     <Button type="primary" icon={<PlusCircleOutlined />} size="large">
        //       Add Asset
        //     </Button>
        //   </Tooltip>
        // }
      >
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
        <div className="table-responsive">
          <Table
            columns={AssettableColumns}
            dataSource={list}
            rowKey="id"
            pagination={false}
            bordered
          />
        </div>
      </Card>
    </div>
  );
};

export default UserInfo;
