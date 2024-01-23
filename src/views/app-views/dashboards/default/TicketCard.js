import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

const MyComponent = () => {
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    // Simulate API call using Axios, replace with your actual API endpoint
    axios.get('YOUR_API_ENDPOINT_HERE')
      .then(response => {
        setTicketData(response.data.slice(0, 6)); // Limiting to 6 items for demonstration
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const ticketCards = [
    { title: 'New Ticket', content: ' New Ticket', value: 10 },
    { title: 'Open Ticket', content: 'Open Ticket', value: 20 },
    { title: 'Close Ticket', content: 'Close Ticket', value: 5 },
    { title: 'In Progress', content: 'In Progress', value: 15 },
    { title: 'Resolve', content: 'Resolve', value: 30 },
    { title: 'Pending', content: 'Pending', value: 25 },
  ];

  return (
    <div style={{ padding: '30px',paddingBottom:"20px 20px 20px 20px" }}>
      <Row gutter={24}>
        {ticketData.map((ticket, index) => (
          <Col key={ticket.id || index} span={4}>
            <Card title={ticket.title} bordered={false}>
              <Text>{ticket.description}</Text>
            </Card>
          </Col>
        ))}
        {ticketCards.map((card, index) => (
          <Col key={index} span={4}>
            <Card
              title={<Title level={4}>{card.title}</Title>}
              bordered={false}
              style={{ backgroundColor: '#fff', borderRadius: 8 }}
            >
              <Text>{card.content}</Text>
              <br />
              <Text strong>Value: {card.value}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyComponent;
