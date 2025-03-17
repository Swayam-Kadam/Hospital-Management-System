import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const VerticalChart = ({ chartData = [], title,heading}) => {
 // Ensure chartData is always an array
 const labels = chartData.map((item, index) => item.name || `Entry ${index + 1}`);
 const dataValues = chartData.map((item) => item.value || 0);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: heading,
      },
    },
  };

 const data = {
   labels,
   datasets: [
     {
       label:title||"Chart",
       data: dataValues,
       backgroundColor: "rgba(53, 162, 235, 0.5)",
     },
   ],
 };

 return <Bar options={options} data={data} />;
};


export default VerticalChart
