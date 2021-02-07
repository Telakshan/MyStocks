import React from "react";
import { Bar } from "react-chartjs-2";
import './Stock.css'

const BarChart = (props) => {
  const data = {
    labels: props.x,
    datasets: [
      {
        label:  'Sentiment Compound Score',
        data: props.y,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        
        borderColor:  "rgba(54, 162, 235, 1)",
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className='bar-container'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
