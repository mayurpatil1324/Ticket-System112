import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import masterService from '../../../../services/MasterService';
import { COLOR_1, COLOR_2 } from 'constants/ChartConstant';


const Graph = () => {
  const [barChartData, setBarChartData] = useState({
    series: [
      { name: 'Unsolve', data: [] },
      { name: 'Solved', data: [] },
    ],
    options: {
      chart: {
        toolbar: {
          show:false,
          }},
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      colors: [COLOR_1, COLOR_2],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [], // Initialize with an empty array
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}`,
        },
      },
      
    },
  });

  
    const fetchData = async () => {
      try {
        const response = await masterService.getDashboard();
        const { data } = response;

        // Update x-axis categories (months) dynamically
        const months = data.graph.map((item) => item.month);

        // Update series data dynamically based on API response
        const unsolvedData = data.graph.map((item) => item.Unslosed_tickets);
        const solvedData = data.graph.map((item) => item.Solved_tickets);

        setBarChartData((prevChartData) => ({
          ...prevChartData,
          series: [
            { name: 'Unsolve', data: unsolvedData },
            { name: 'Solved', data: solvedData },
          ],
          options: {
            ...prevChartData.options,
            xaxis: {
              categories: months,
            },
          },
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    useEffect(() => {
    fetchData(); // Call the function to fetch data on component mount
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <div style={{ background: 'white', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
      <Chart options={barChartData.options} series={barChartData.series} height={400} type="bar" />
    </div>
  );
};

export default Graph;
