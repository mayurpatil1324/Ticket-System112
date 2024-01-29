import React, { useState, useEffect } from "react";
import { Card, Row, Typography } from "antd";
import masterService from '../../../../services/MasterService';
const { Title, Text } = Typography;

const TicketCards = () => {
  const [ticketCardData, setTicketCardData] = useState([
    // { title: 'New Ticket', value: 0 },
    // { title: 'Open Ticket', value: 0 },
    // { title: 'Close Ticket', value: 0 },
    // { title: 'In Progress', value: 0 },
    // { title: 'Resolve', value: 0 },
    // { title: 'Pending', value: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await masterService.getDashboard(/* pass any necessary data */);
        const { data } = response;

        // Create ticketCardData directly from API response
        const updatedTicketCardData = data.count_percentage.map((item) => ({
          title: item.status,
          value: item.count,
        }));

        setTicketCardData(updatedTicketCardData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data on component mount
  }, []);

  return (
    <div>
      <Row gutter={24}>
        {ticketCardData.map((card, index) => (
          <Card
            key={index}
            bordered={false}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 8,
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
              ":hover": {
                transform: "scale(1.05)",
              },
              height: "110px",
              flex: 1,
              margin: "0 12px", // Add margin between cards
            }}
          >
            <Text style={{ color: "black", textTransform: "uppercase", fontWeight: "bolder" }}>
              {card.title === "Close Ticket" ? (
                <strong>{card.title}</strong>
              ) : (
                card.title
              )}
            </Text>
            <Title level={2} style={{ color: "#333", fontWeight: "bold", marginTop: "10px", fontSize: "30px" }}>
              {card.title === "Close Ticket" ? (
                <strong>{card.value}</strong>
              ) : (
                card.value
              )}
            </Title>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default TicketCards;
