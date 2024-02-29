import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrement des composants nécessaires
ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend);

interface StripChartProps {
  data: {
    datasets: {
      label: string;
      data: { x: number; y: number }[];
      backgroundColor: string;
    }[];
  };
}

const StripChart: React.FC<StripChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2">
      {" "}
      <Scatter
        data={data}
        options={{
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
            y: {
              // Configuration spécifique pour simuler un Strip Chart
              beginAtZero: true,
            },
          },
        }}
      />
      ;
    </div>
  );
};

export default StripChart;
