import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { MassifSnapshot } from "@/types/massif";
import { randomColors } from "@/utils/randomColors";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface SnapshotMemorySeries {
  label: string;
  data: MassifSnapshot[];
}

const LineChart = (props: { data: SnapshotMemorySeries[] }) => {
  let { data } = props;

  data = data.filter((datum) => datum.data.length > 0);

  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
      data={{
        labels: Array.from(
          new Set(
            data
              .map((datum) => datum.data.map((snapshot) => snapshot.id))
              .reduce((acc, curr) => acc.concat(curr), []),
          ),
        ),
        datasets: data.map((datum, index) => ({
          label: datum.label,
          data: datum.data.map((snapshot) => snapshot.mem_heap),
          fill: false,
          borderColor: randomColors[index % 10],
          tension: 0.1,
        })),
      }}
    />
  );
};

export default LineChart;
