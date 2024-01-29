import React from "react";

import Ticketbystatus from "./ticketbystatus";
import Graph from "./graph";
import TicketCard from "./TicketCard";
import { Card, Col, Row } from "antd";

const DefaultDashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24}>
          <TicketCard />
        </Col>
        <Col xs={24} sm={12} style={{ marginTop: "30px" }}>
          <Graph />
        </Col>
        <Col xs={24} sm={12} style={{ marginTop: "30px" }}>
          <Ticketbystatus />
        </Col>
      </Row>
    </>
  );
};

export default DefaultDashboard;
