import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const AreaChart = ({ data }) => {
  const labels = (data.data && data.data?.map((ele) => ele.month)) || [];
  console.log(labels);
  const Data = {
    labels,
    datasets: [
      {
        fill: true,
        label: data.tag,
        data: data.data?.map((ele) => ele.count),
        borderColor: data.color || "rgb(53, 162, 235)",
        backgroundColor: data.color || "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="h-full">
      <Line options={options} data={Data} />
    </div>
  );
};

export default AreaChart;
