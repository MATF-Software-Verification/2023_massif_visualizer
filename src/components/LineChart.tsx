import React from "react";
import { AxisOptions, Chart, UserSerie } from "react-charts";

import { MassifSnapshot } from "@/types/massif";

export interface SnapshotMemorySeries {
  label: string;
  data: MassifSnapshot[];
}

const LineChart = (props: { data: SnapshotMemorySeries[] }) => {
  let { data } = props;

  data = data.filter((datum) => datum.data.length > 0);

  const primaryAxis = React.useMemo<AxisOptions<MassifSnapshot>>(
    () => ({
      getValue: (datum) => datum.id,
    }),
    [],
  );

  const secondaryAxes = React.useMemo<AxisOptions<MassifSnapshot>[]>(
    () => [
      {
        getValue: (datum) => datum.mem_heap,
      },
    ],
    [],
  );

  // FIXME: make tooltip follow cursor instead of staying in top left
  if (data.length === 0) return <></>;

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
      }}
    />
  );
};

export default LineChart;
