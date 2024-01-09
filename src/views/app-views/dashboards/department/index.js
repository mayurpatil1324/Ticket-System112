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
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { } from "react-router-dom";
import utils from "utils";
//import { getCourseType } from '../../../../services/MasterService';
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

  form.setFieldsValue({
    department: initialVal.name,
    statusName: statusShow,
  });
  //console.log(initialVal)
  return (
    <Modal
      destroyOnClose={true}
      title="Add New Department"
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
          department: initialVal.name,
          statusName: statusShow,
        }}
      >
        <Form.Item
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: "Please enter department!",
            },
          ]}
        >
          <Input
            placeholder="Department"
            onChange={inputChange("name", initialVal.id)}
          />
        </Form.Item>
        <Form.Item label="Status" name="statusName">
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

const DepartmentList = () => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({ id: "", name: "" });
  const [modalVisibleConfirmation, setModalVisibleConfirmation] =
    useState(false);
  const [initialId, setInitialId] = useState(0);
  const [listAll, setListAll] = useState([]);
  const [btnShowHide, setBtnShowHide] = useState({ add: 0, edit: 0, delete: 0 });
  const auth_details = JSON.parse(useSelector(state => state.auth.auth_details))

  const listData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getDepartment(reqeustParam);
      resp
        .then((res) => {
          setList(res.data);
          setListAll(res.data);
        })
        .catch((err) => { });
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    listData();
    //console.log(auth_details?.role_permissions)    
    //const addPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 5)
    //const editPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 6)
   // const delPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 7)
    //setBtnShowHide({ add: addPermission.length, edit: editPermission.length, delete: delPermission.length })
    setBtnShowHide({ add: 1, edit: 1, delete: 1 })


  }, []);

  const tableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Department",
      dataIndex: "name",

      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
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
          {btnShowHide.edit > 0 &&
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
          }
          {btnShowHide.delete > 0 &&
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
          }
        </Flex>
      ),
    },
  ];

  const onSearch = (e) => {
    //console.log(e.currentTarget.value);
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

  const statusOnChange = (show) => {
    //console.log(show)

    setStatusShow(show);
  };

  const addEditDepartment = (values) => {
    //console.log(values)
    let departmentstatus = values.statusName === true ? 1 : 0;

    //console.log(initialVal);
    if (initialVal.id > 0) {
      const reqeustParam = {
        department_id: initialVal.id,
        name: values.department,
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
        .catch((err) => { });
    } else {
      const reqeustParam = { name: values.department, is_active: departmentstatus };
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
        .catch((err) => { });
    }

  };
  const showEditVaue = (elm) => {
    //console.log(elm)

    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({ id: elm.id, name: elm.name });
    setStatusShow(statustype);

    showModal();
  };
  const deleteDepartment = (elm) => {
    //console.log(elm)
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };
  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { department_id: initialId };
    //console.log(initialId)
    const resp = masterService.deleteDepartment(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Department deleted successfully.",
          });
        }
      })
      .catch((err) => { });
  };
  const inputChange = (name, id) => (e) => {
    //console.log(name);
    //console.log(e.target.value)
    setInitialVal({
      id: id,
      [name]: e.target.value,
    });
  };

  var i = 1;
  return (
    <Card>
      <Row gutter={16} className="justify-content-between my-4">
        <Col className="text-end mb-2" xs={24} sm={24} md={18}>
          {btnShowHide.add > 0 &&
            <Button
              onClick={showModal}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Add Department
            </Button>
          }
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

export default DepartmentList;
