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
    designation: initialVal.name,
    grade: initialVal.grade,
    statusName: statusShow,
  });
  //console.log(initialVal)
  return (
    <Modal
      destroyOnClose={true}
      title="Add New Designation"
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
        name="addDesignation"
        layout="vertical"
        initialValues={{
          id: initialVal.id,
          designation: initialVal.name,
          grade: initialVal.grade,
          statusName: statusShow,
        }}
      >
        <Form.Item
          label="Designation"
          name="designation"
          rules={[
            {
              required: true,
              message: "Please enter designation!",
            },
          ]}
        >
          <Input
            placeholder="Designation"
            onChange={inputChange("name", initialVal.id)}
          />
        </Form.Item>
        <Form.Item
          label="Grade"
          name="grade"
          rules={[
            {
              required: true,
              message: "Please enter grade!",
            },
          ]}
        >
          <Input
            placeholder="Grade"
            onChange={inputChange("grade", initialVal.id)}
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
      title="Designation"
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

const DesignationList = () => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({ id: "", name: "", grade:"" });
  const [modalVisibleConfirmation, setModalVisibleConfirmation] =
    useState(false);
  const [initialId, setInitialId] = useState(0);
  const [listAll, setListAll] = useState([]);
  const [btnShowHide, setBtnShowHide] = useState({ add: 0, edit: 0, delete: 0 });
  const auth_details = JSON.parse(useSelector(state => state.auth.auth_details))

  const listData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getDesignation(reqeustParam);
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
    const addPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 5)
    const editPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 6)
    const delPermission = auth_details.role_permissions.filter((listPer) => listPer.id === 7)
    //setBtnShowHide({ add: addPermission.length, edit: editPermission.length, delete: delPermission.length })
    setBtnShowHide({ add: 1, edit: 1, delete: 1 })


  }, []);

  const tableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Designation",
      dataIndex: "name",

      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
        title: "Grade",
        dataIndex: "grade",
  
        sorter: (a, b) => utils.antdTableSorter(a, b, "grade"),
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
                  deleteDesignation(elm.id);
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
    setInitialVal({ id: "", name: "", grade:"" });
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    //console.log(show)

    setStatusShow(show);
  };

  const addEditDesignation = (values) => {
    //console.log(values)
    let departmentstatus = values.statusName === true ? 1 : 0;

    //console.log(initialVal);
    if (initialVal.id > 0) {
      const reqeustParam = {
        designation_id: initialVal.id,
        name: values.designation,
        grade: values.grade,
        is_active: departmentstatus,
      };
      const resp = masterService.editDesignation(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "Designation updated successfully.",
          });
          setInitialVal({ id: "", name: "", grade:"" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => { });
    } else {
      const reqeustParam = { name: values.designation,grade:values.grade, is_active: departmentstatus };
      const resp = masterService.addDesignation(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "Designation added successfully." });
          setInitialVal({ id: "", name: "", grade:"" });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => { });
    }

  };
  const showEditVaue = (elm) => {
    //console.log(elm)

    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({ id: elm.id, name: elm.name, grade:elm.grade });
    setStatusShow(statustype);

    showModal();
  };
  const deleteDesignation = (elm) => {
    //console.log(elm)
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };
  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { designation_id: initialId };
    //console.log(initialId)
    const resp = masterService.deleteDesignation(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Designation deleted successfully.",
          });
        }
      })
      .catch((err) => { });
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
      <Row gutter={16} className="justify-content-between my-4">
        <Col className="text-end mb-2" xs={24} sm={24} md={18}>
          {btnShowHide.add > 0 &&
            <Button
              onClick={showModal}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Add Designation
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
        onCreate={addEditDesignation}
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

export default DesignationList;