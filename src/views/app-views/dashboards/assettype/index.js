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
  Select,
  DatePicker,
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
import { Option } from "antd/es/mentions";

const statusOptions = [
  { id: 1, type: "Hardware" },
  { id: 2, type: "Software" },
];
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
  const [formData, setFormData] = useState({
    type: initialVal.type,
  });
  // form.setFieldsValue({
  //   id: initialVal.id,
  //   name: initialVal.name,
  //   type: initialVal.type,
  //   key: initialVal.key,
  //   expiry_date: initialVal.expiry_date,
  //   is_active: statusShow,
  // });

  return (
    <Modal
      destroyOnClose={true}
      title={initialVal.id > 0 ? "Edit Asset Type" : "Add New Asset Type"}
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
        name="AddAssetType"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          name: initialVal.name,
          type: initialVal.type,
          key: initialVal.key,
          expiry_date: initialVal.expiry_date,
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
        <Form.Item label="Type" name="type">
          <Select
            onChange={(value) => setFormData({ ...formData, type: value })}
          >
            {statusOptions.map((option) => (
              <Option key={option.type} value={option.type}>
                {option.type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Key"
          name="key"
          rules={[
            {
              required: true,
              message: "Please enter Key!",
            },
          ]}
        >
          <Input
            placeholder="Key"
            onChange={inputChange("key", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Expiry Date"
          name="expiry_date"
         
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Select Expiry Date"
           
          />
        </Form.Item>

        <Form.Item label=" Active" name="statusName">
          <Switch onChange={statusOnChange} checked={statusShow} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ConfirmationBox = ({ id, visible, onOKConfirm, onCancelConfirm }) => {
  return (
    <Modal
      destroyOnClose={true}
      title="AssetType"
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
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({ id: "", name: "" });
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
      const resp = masterService.getAssettype(reqeustParam);
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
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => utils.antdTableSorter(a, b, "type"),
    },
    {
      title: "Key",
      dataIndex: "key",
      sorter: (a, b) => utils.antdTableSorter(a, b, "key"),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry_date",

      sorter: (a, b) => utils.antdTableSorter(a, b, "expiry_date"),
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
                  deleteAssettype(elm.id);
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
    setInitialVal({ id: "", name: "", type: "", key: "", expiry_date: "" });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addEditAssettype = (values) => {
    let assettypetstatus = values.statusName === true ? 1 : 0;

    if (initialVal.id > 0) {
      const reqeustParam = {
        asset_id: initialVal.id,
        name: values.name,
        type: values.type,
        key: values.key,
        expiry_date: values.expiry_date,

        is_active: assettypetstatus,
      };
      const resp = masterService.editAssettype(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "Asset Type updated successfully.",
          });
          setInitialVal({
            id: "",
            name: "",
            type: "",
            key: "",
            expiry_date: "",
          });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const reqeustParam = {
        name: values.name,
        type: values.type,
        key: values.key,
        expiry_date: values.expiry_date,

        is_active: assettypetstatus,
      };
      const resp = masterService.addAssettype(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "Assettype added successfully." });
          setInitialVal({
            id: "",
            name: "",
            type: "",
            key: "",
            expiry_date: "",
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
      name: elm.name,
      type: elm.type,
      key: elm.key,
     // expiry_date: elm.expiry_date,
    });
    setStatusShow(statustype);

    showModal();
  };

  const deleteAssettype = (elm) => {
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };

  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { asset_type_id: initialId };
    const resp = masterService.deleteAssettype(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Assettype Delete successfully.",
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
              Add Asset Type
            </Button>
          )}
        </Col>
      </Row>
      <AddNewCardForm
        visible={modalVisible}
        onCreate={addEditAssettype}
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
