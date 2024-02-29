import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartTypeRegistry,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MixedChartProps {
  data: {
    labels: string[];
    datasets: {
      // s'assurer que type est un type de graphique valide.
      type: keyof ChartTypeRegistry;
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
  return (
    <div className="bg-white border-secondary border-2">
      <Chart type="bar" data={data} />;
    </div>
  );
};

export default MixedChart;
