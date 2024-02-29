import { ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


interface StackedBarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string | string[];
    }[];
  };
  options: ChartOptions<'bar'>;
}



const StackedBarChart: React.FC<StackedBarChartProps> = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default StackedBarChart;
