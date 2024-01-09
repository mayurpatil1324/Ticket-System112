import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Input, Button } from "antd";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import utils from "utils";
import masterService from "../../../../services/MasterService";
import { useNavigate } from "react-router-dom";

const TicketList = () => {
    const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [listAll, setListAll] = useState([]);

  const listData = () => {
    const reqeustParam = {};
    try {
      const resp = masterService.getTicket(reqeustParam);
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
  }, []);

  const tableColumns = [
    {
      title: "Ticket. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      sorter: (a, b) => utils.antdTableSorter(a, b, "subject"),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      sorter: (a, b) => utils.antdTableSorter(a, b, "priority"),
    },
    {
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => utils.antdTableSorter(a, b, "status"),
    },
  ];

  const addView = () => {
    console.log('ghjkkkl');
   navigate(`/dashboards/ticket/create`);
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? listAll : listAll;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
  };

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
          <Button type="primary" icon={<PlusCircleOutlined />}
          onClick={() => {
            addView();
          }}>
            New Ticket
          </Button>
        </Col>
      </Row>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default TicketList;
