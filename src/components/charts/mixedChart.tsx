import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ChartType } from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Enregistrez tous les éléments nécessaires à Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

interface MixedChartProps {
  data: {
    labels: string[];
    datasets: {
      type: ChartType; 
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      borderWidth?: number;
      fill?: boolean;
    }[];
  };
}

const MixedChart: React.FC<MixedChartProps> = ({ data }) => {
  return <Chart type='bar' data={data} />;
};

export default MixedChart;
