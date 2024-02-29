import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface PolarChartProps {
  data: ChartData<"polarArea", number[], string>;
}

const PolarChart: React.FC<PolarChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2">
      {" "}
      <PolarArea data={data} />;
    </div>
  );
};

export default PolarChart;
