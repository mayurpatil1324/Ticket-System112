import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { COLORS } from 'constants/ChartConstant';
import masterService from '../../../../services/MasterService';

const TicketByStatus = () => {
  const [donutChartData, setDonutChartData] = useState({
    series: [0, 0, 0, 0, 0], // Initialize with zeros
    options: {
      colors: COLORS,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 50,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      labels: ['Open', 'In-Progress', 'Pending', 'On Hold', 'Resolved'], // Initialize with default labels
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await masterService.getDashboard(/* pass any necessary data */);
        const { data } = response;

        // Update series data dynamically based on API response
        const seriesData = data.count_percentage.map((item) => item.count);

        // Update labels based on API response
        const labels = data.count_percentage.map((item) => item.status +': '+ item.count);

        setDonutChartData((prevChartData) => ({
          ...prevChartData,
          series: seriesData,
          options: {
            ...prevChartData.options,
            labels: labels,
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data on component mount
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  const chartStyle = {
    background: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '6px 0',
  };

  return (
    <div style={chartStyle}>
      <Chart options={donutChartData.options} series={donutChartData.series} height={400} type="donut" />
    </div>
  );
};

export default TicketByStatus;
