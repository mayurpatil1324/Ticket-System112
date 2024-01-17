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

  form.setFieldsValue({
    id: initialVal.id,
    ticket_id: initialVal.ticket_id,
    user_id: initialVal.user_id,


    // statusName: statusShow,
  });

  // return (
  //   // <Modal
  //   //   destroyOnClose={true}
  //   //   title={initialVal.id > 0 ? "Edit Ticket Status" : "Add New Ticket Status"}
  //   //   open={visible}
  //   //   okText="Submit"
  //   //   onCancel={onCancel}
  //   //   onOk={() => {
  //   //     form
  //   //       .validateFields()
  //   //       .then((values) => {
  //   //         form.resetFields();
  //   //         onCreate(values);
  //   //       })
  //   //       .catch((info) => {
  //   //         console.log("Validate Failed:", info);
  //   //       });
  //   //   }}
  //   // >
  //   //   <Form
  //   //     preserve={false}
  //   //     form={form}
  //   //     name="Ticket Status"
  //   //     layout="vertical"
  //   //     initialValues={{
  //   //       id: initialVal.id,
  //   //       ticket_id: initialVal.ticket_id,
  //   //       is_active: statusShow,
  //   //     }}
  //   //   >
  //   //     <Form.Item
  //   //       label="Ticket Id"
  //   //       name="ticket_id"
  //   //       rules={[
  //   //         {
  //   //           required: true,
  //   //           message: "Please enter Ticket Id!",
  //   //         },
  //   //       ]}
  //   //     >
  //   //       <Input
  //   //         placeholder="Name"
  //   //         onChange={inputChange("ticket_id", initialVal.id)}
  //   //       />
  //   //     </Form.Item>
        
  //   //     <Form.Item label=" Active" name="statusName">
  //   //       <Switch onChange={statusOnChange} checked={statusShow} />
  //   //     </Form.Item>
  //   //   </Form>
  //   // </Modal>
  // );
};

// const ConfirmationBox = ({ id, visible, onOKConfirm, onCancelConfirm }) => {
//   return (
//     <Modal
//       destroyOnClose={true}
//       title="Ticket Id"
//       open={visible}
//       okText="OK"
//       onCancel={onCancelConfirm}
//       onOk={() => {
//         onOKConfirm();
//       }}
//     >
//       Are you sure want to delete this item?
//     </Modal>
//   );
// };

const Statuslist = () => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({ id: "", ticket_id: "",  });
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
      const resp = masterService.getReassign(reqeustParam);
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
      title: "Ticket ",
      dataIndex: "ticket_id",
      sorter: (a, b) => utils.antdTableSorter(a, b, "ticket_id"),
    },
    {
      title: "User ",
      dataIndex: "user_id",
      sorter: (a, b) => utils.antdTableSorter(a, b, "user_id"),
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
          {/* {btnShowHide.delete > 0 && (
            // <Tooltip title="Delete">
            //   <Button
            //     danger
            //     icon={<DeleteOutlined />}
            //     onClick={() => {
            //       deleteStatus(elm.id);
            //     }}
            //     size="small"
            //   />
            // </Tooltip>
          )} */}
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
    setInitialVal({ id: "", name: "",});
    setModalVisible(false);
    setStatusShow(false);
  };

  const statusOnChange = (show) => {
    setStatusShow(show);
  };

  const addEditDepartment = (values) => {
    let departmentstatus = values.statusName === true ? 1 : 0;

    if (initialVal.id > 0) {
      const reqeustParam = {
        ticket_id: initialVal.id,
        name: values.name,
     
        is_active: departmentstatus,
      };
      const resp = masterService.editStatus(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            listData();
          }
          notification.success({
            message: "Status updated successfully.",
          });
          setInitialVal({ id: "", ticket_id: "", });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    } else {
      const reqeustParam = {
        name: values.name,
        
        is_active: departmentstatus,
      };
      const resp = masterService.addStatus(reqeustParam);
      resp
        .then((res) => {
          if (res.status === 200) {
            setList([...list, res.data]);
          }

          notification.success({ message: "Status added successfully." });
          setInitialVal({ id: "", ticket_id: "", });
          setStatusShow(false);
          setModalVisible(false);
        })
        .catch((err) => {});
    }
  };

  const showEditVaue = (elm) => {
    let statustype = elm.is_active === 1 ? true : false;
    setInitialVal({ id: elm.id, ticket_id: elm.ticket_id,  });
    setStatusShow(statustype);

    showModal();
  };

  const deleteStatus = (elm) => {
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };

  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { department_id: initialId };
    const resp = masterService.deleteStatus(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({
            message: "Status Delete successfully.",
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
              Add 
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
      {/* <ConfirmationBox
        id={initialId}
        visible={modalVisibleConfirmation}
        onOKConfirm={onOKConfirm}
        onCancelConfirm={onCancelConfirm}
      /> */}
      <div className="table-responsive">
        <Table key={i++} columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default Statuslist;
