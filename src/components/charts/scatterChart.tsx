import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

// Register the components you will use
ChartJS.register(
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale // This is used if you're going to have categories on one of the axes
);

interface ScatterChartProps {
  data: {
    datasets: {
      label: string;
      data: { x: number; y: number }[];
      backgroundColor: string;
    }[];
  };
}

const ScatterChart: React.FC<ScatterChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2">
      {" "}
      <Scatter
        data={data}
        options={{
          scales: {
            x: {
              type: "linear", // Specifies the scale type
              position: "bottom", // Position of the scale
            },
            // You can configure the y-axis similarly if needed
          },
        }}
      />
      ;
    </div>
  );
};

export default ScatterChart;
