import React from "react";

import Ticketbystatus from "./ticketbystatus";
import Graph from "./graph";
import TicketCard from "./TicketCard";
import { Col, Row } from "antd";

const DefaultDashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24}>
          <TicketCard />
        </Col>
        <Col xs={24} sm={14}>
        <Graph />
        </Col>
        <Col xs={24} sm={10}>
        <Ticketbystatus />
        </Col>
      </Row>

     
     
    </>
  );
};

export default DefaultDashboard;
