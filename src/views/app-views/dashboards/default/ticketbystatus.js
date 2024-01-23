import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { COLORS } from 'constants/ChartConstant';

const Ticketbystatus = () => {
  const [donutChartData, setDonutChartData] = useState({
    series: [44, 55, 41, 17, 15],
    options: {
      colors: COLORS,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <Chart
      options={donutChartData.options}
      series={donutChartData.series}
      height={300}
      type="donut"
    />
  );
};

export default Ticketbystatus;
