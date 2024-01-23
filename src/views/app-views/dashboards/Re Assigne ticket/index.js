import React, { useState, useEffect } from "react";

import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Modal,
  Form,
  notification,
} from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";
import {} from "react-router-dom";
import utils from "utils";
import masterService from "../../../../services/MasterService";

const Statuslist = () => {
  const [list, setList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [statusShow, setStatusShow] = useState(false);
  const [initialVal, setInitialVal] = useState({ id: "", ticket_id: "",user_id:""  });
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
      title: "Ticket Id",
      dataIndex:"ticket_number",
      sorter: (a, b) => utils.antdTableSorter(a, b,["ticket_number"]),
    },
    {
      title: "User Name",
      dataIndex:"user_id",
      sorter: (a, b) => utils.antdTableSorter(a, b, ["user_id"]),
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? listAll : listAll;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

  // const showModal = () => {
  //   setModalVisible(true);
  // };

  // const closeModal = () => {
  //   setInitialVal({ id: "", name: "",});
  //   setModalVisible(false);
  //   setStatusShow(false);
  // };

  // const statusOnChange = (show) => {
  //   setStatusShow(show);
  // };

  // const addEditReassign = (values) => {
  //   let reassignestatus = values.statusName === true ? 1 : 0;

  //   if (initialVal.id > 0) {
  //     const reqeustParam = {
  //       ticket_id: initialVal.id,
  //       name: values.name,
     
  //       is_active: reassignestatus,
  //     };
  //     const resp = masterService.getReassign(reqeustParam);
  //     resp
  //       .then((res) => {
  //         if (res.status === 200) {
  //           listData();
  //         }
  //         notification.success({
  //           message: "Status updated successfully.",
  //         });
  //         setInitialVal({ id: "", ticket_number: "",user_id:"" });
  //         setStatusShow(false);
  //         setModalVisible(false);
  //       })
  //       .catch((err) => {});
  //   } else {
  //     const reqeustParam = {
  //       name: values.name,
        
  //       is_active: reassignestatus,
  //     };
  //     const resp = masterService.getReassign(reqeustParam);
  //     resp
  //       .then((res) => {
  //         if (res.status === 200) {
  //           setList([...list, res.data]);
  //         }

  //         notification.success({ message: "Status added successfully." });
  //         setInitialVal({ id: "", ticket_id: "", });
  //         setStatusShow(false);
  //         setModalVisible(false);
  //       })
  //       .catch((err) => {});
  //   }
  // };

  // const showEditVaue = (elm) => {
  //   let statustype = elm.is_active === 1 ? true : false;
  //   setInitialVal({ id: elm.id, ticket_id: elm.ticket_id,  });
  //   setStatusShow(statustype);

  //   showModal();
  // };

  // const deleteStatus = (elm) => {
  //   setInitialId(elm);
  //   setModalVisibleConfirmation(true);
  // };

  // const onCancelConfirm = () => {
  //   setInitialId(0);
  //   setModalVisibleConfirmation(false);
  // };

  // const onOKConfirm = () => {
  //   const reqeustParam = { reassigne_id: initialId };
  //   const resp = masterService.deleteStatus(reqeustParam);
  //   resp
  //     .then((res) => {
  //       if (res.status === 200) {
  //         setModalVisibleConfirmation(false);
  //         listData();
  //         notification.success({
  //           message: "Status Delete successfully.",
  //         });
  //       }
  //     })
  //     .catch((err) => {});
  // };

  // const inputChange = (name, id) => (e) => {
  //   setInitialVal({
  //     id: id,
  //     [name]: e.target.value,
  //   });
  // };

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
      </Row>
      {/* <AddNewCardForm
        visible={modalVisible}
        onCreate={addEditReassign}
        onCancel={closeModal}
        statusOnChange={statusOnChange}
        statusShow={statusShow}
        initialVal={initialVal}
        inputChange={inputChange}
      /> */}
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
