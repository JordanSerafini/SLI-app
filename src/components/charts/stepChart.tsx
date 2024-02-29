import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface StepChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
      tension: number;
      stepped: boolean | 'before' | 'after' | 'middle';
    }[];
  };
}

const StepChart: React.FC<StepChartProps> = ({ data }) => {
  return <Line data={data} options={{ elements: { line: { tension: 0, stepped: true } } }} />;
};

export default StepChart;
