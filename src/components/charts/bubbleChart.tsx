import React from "react";
import { Bubble } from "react-chartjs-2";
import { Chart as ChartJS, ChartData, Tooltip, Legend } from "chart.js";

ChartJS.register(Tooltip, Legend);

interface BubbleChartProps {
  data: ChartData<"bubble">;
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  return (
    <div className="bg-white border-secondary border-2">
      <Bubble data={data} />;
    </div>
  );
};

export default BubbleChart;
