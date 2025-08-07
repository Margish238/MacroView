// src/components/WeeklyTrends.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import './WeeklyTrends.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const WeeklyTrends = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Calories',
        data: [1800, 1900, 2000, 1700, 2100, 1950, 2050],
        borderColor: '#f87171',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
      },
      {
        label: 'Protein',
        data: [120, 135, 140, 130, 150, 125, 145],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      },
      {
        label: 'Carbs',
        data: [220, 230, 210, 200, 250, 240, 230],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
      },
      {
        label: 'Fat',
        data: [60, 70, 65, 55, 75, 70, 68],
        borderColor: '#facc15',
        backgroundColor: 'rgba(250, 204, 21, 0.1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#f5f5f5',
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#f5f5f5' },
        grid: { color: '#374151' },
      },
      y: {
        ticks: { color: '#f5f5f5' },
        grid: { color: '#374151' },
      },
    },
  };

  return (
    <div className="weekly-trends modern">
      <h2 className="chart-title">Weekly Macro Trends</h2>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyTrends;
