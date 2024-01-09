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
  notification,
  Pagination,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { useNavigate } from "react-router-dom";
import utils from "utils";
import clientService from "services/ClientService";
import { useSelector } from "react-redux";
import userService from "services/UserServoce";
const ConfirmationBox = ({ id, visible, onOKConfirm, onCancelConfirm }) => {
  return (
    <Modal
      destroyOnClose={true}
      title="Client"
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

const ClientList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [modalVisibleConfirmation, setModalVisibleConfirmation] =
    useState(false);
  const [initialId, setInitialId] = useState(0);
  const [record, setrecord] = useState(1);
  const [listAll, setListAll] = useState([]);
  const [btnShowHide, setBtnShowHide] = useState({
    add: 0,
    edit: 0,
    delete: 0,
    upload: 0,
    course: 0,
  });
  const auth_details = JSON.parse(
    useSelector((state) => state.auth.auth_details)
  );
  //console.log(record);
  const listData = (page, pageSize) => {
    const reqeustParam = { is_active:null  };
    try {
      const resp = userService.getUser(reqeustParam);
      resp
        .then((res) => {
          console.log(res)
          setrecord(parseInt(res.data.total));
          setList(res.data.data);
          setListAll(res.data.data);
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
    listData(1, 50);
    const addPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 43
    );
    const editPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 36
    );
    const delPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 37
    );
    const uploadPermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 38
    );
    const coursePermission = auth_details.role_permissions.filter(
      (listPer) => listPer.id === 39
    );
    setBtnShowHide({
      add: addPermission.length,
      edit: editPermission.length,
      delete: delPermission.length,
      upload: uploadPermission.length,
      course: coursePermission.length,
    });
  }, []);

  const tableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Client Name",
      dataIndex: "name",

      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Address",
      dataIndex: "address",

      sorter: (a, b) => utils.antdTableSorter(a, b, "address"),
    },

    {
      title: "City",
      dataIndex: "city",

      sorter: (a, b) => utils.antdTableSorter(a, b, "city"),
    },
    {
        title: "State",
        dataIndex: "state",
  
        sorter: (a, b) => utils.antdTableSorter(a, b, "state"),
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
          
          
            <Tooltip title="Edit">
              <Button
                type="primary"
                className="mr-2"
                icon={<EditOutlined />}
                onClick={() => {
                  editClient(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          
          
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteClient(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          
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

  const deleteClient = (elm) => {
    //console.log(elm)
    setInitialId(elm);
    setModalVisibleConfirmation(true);
  };
  const onCancelConfirm = () => {
    setInitialId(0);
    setModalVisibleConfirmation(false);
  };

  const onOKConfirm = () => {
    const reqeustParam = { college_id: initialId };
    //console.log(initialId)
    const resp = clientService.deleteClient(reqeustParam);
    resp
      .then((res) => {
        if (res.status === 200) {
          setModalVisibleConfirmation(false);
          listData();
          notification.success({ message: "College deleted successfully." });
        }
      })
      .catch((err) => {});
  };

  const addClient = () => {
    navigate(`/dashboards/client-add`);
  };
  const editClient = (id) => {
    navigate(`/dashboards/client-edit/${id}`);
  };

  
  
  var i = 1;
  return (
    <Card>
      <Row gutter={16} className="justify-content-between mb-4">
        <Col className="text-end mb-2" xs={24} sm={24} md={18}>
          

          {btnShowHide.add > 0 && (
            <Button
              onClick={addClient}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Add Client
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
        <Pagination
          defaultCurrent={1}
          total={record}
          onChange={nexPageData}
          defaultPageSize={50}
          hideOnSinglePage
          pageSizeOptions={[10, 50, 100, 500]}
        />
      </div>
    </Card>
  );
};

export default ClientList;
