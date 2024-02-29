import React from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, Tooltip, Legend } from 'chart.js';

ChartJS.register(Tooltip, Legend);

interface BubbleChartProps {
  data: ChartData<'bubble'>;
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  return <Bubble data={data} />;
};

export default BubbleChart;
