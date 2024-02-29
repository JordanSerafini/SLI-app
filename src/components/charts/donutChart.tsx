import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Enregistrement des composants nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2">
      {" "}
      <Doughnut data={data} />;
    </div>
  );
};

export default DonutChart;
