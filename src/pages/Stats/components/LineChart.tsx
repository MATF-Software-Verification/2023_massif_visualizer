import "chartjs-plugin-zoom";

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
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";

import { MassifSnapshot } from "@/types/massif";
import { randomColors } from "@/utils/randomColors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
);

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
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "xy",
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "y",
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Snapshot",
              padding: 10,
              font: {
                size: 16,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Heap Memory (B)",
              padding: 10,
              font: {
                size: 16,
              },
            },
          },
        },
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
