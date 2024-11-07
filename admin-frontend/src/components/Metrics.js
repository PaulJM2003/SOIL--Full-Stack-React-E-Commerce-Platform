// src/components/Metrics.js
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Metrics = ({ totalUsers, avgRatingData, reviewData }) => {
  const avgRatingChartData = {
    labels: avgRatingData.map((item) => item.productName),
    datasets: [
      {
        label: 'Average Rating',
        data: avgRatingData.map((item) => item.rating),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const reviewDataChart = {
    labels: reviewData.map((item) => item.productName),
    datasets: [
      {
        label: 'Number of Reviews',
        data: reviewData.map((item) => item.reviews),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="metrics">
      <div className="metric-item">
      </div>
      <div className="metric-item chart">
        <h3>Average Rating for Different Products</h3>
        <Line data={avgRatingChartData} />
      </div>
      <div className="metric-item chart">
        <h3>Number of Reviews on Each Product</h3>
        <Bar data={reviewDataChart} />
      </div>
    </div>
  );
};

export default Metrics;

