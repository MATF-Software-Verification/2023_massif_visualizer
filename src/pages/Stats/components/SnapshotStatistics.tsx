import React, { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import RangeSlider from "@/components/ui/RangeSlider";
import { HeapNode, MassifOutput } from "@/types/massif";

import LineChart from "./LineChart";
import MassifFileSelector from "./MassifFileSelector";
import SnapshotTree from "./SnapshotTree";

interface ISnapshotStatisticsProps {
  massifOutputs: MassifOutput[];
  labels: string[];
  selectedHeapNode: HeapNode | undefined;
  setSelectedHeapNode: React.Dispatch<React.SetStateAction<HeapNode | undefined>>;
}

const SnapshotStatistics = ({
  massifOutputs,
  labels,
  selectedHeapNode,
  setSelectedHeapNode,
}: ISnapshotStatisticsProps) => {
  const [range, setRange] = useState<{ lower: number; upper: number }>({
    lower: 0,
    upper: Math.max(...massifOutputs.map((output) => output.snapshots.length)),
  });

  const [selectedMassifOutput, setSelectedMassifOutput] = useState<MassifOutput | undefined>(
    massifOutputs.length > 1 ? undefined : massifOutputs[0],
  );

  const maxSliderValue = Math.max(...massifOutputs.map((output) => output.snapshots.length)) - 1;

  return (
    <div className="flex flex-col flex-1 mt-10 ml-10 px-4 pb-8 gap-8">
      <div className="flex flex-row gap-4">
        <Card className="h-full flex-1 basis-2/3">
          <CardHeader>
            <CardTitle>Heap tree Snapshots</CardTitle>
            <CardDescription>Snapshots of the heap tree</CardDescription>
          </CardHeader>
          <CardContent className="h-[500px]">
            {massifOutputs.length > 0 && range.upper > range.lower && (
              <LineChart
                data={massifOutputs.map((output, i) => ({
                  label: labels[i],
                  data: output.snapshots.slice(
                    Math.max(0, range.lower),
                    Math.min(range.upper, output.snapshots.length),
                  ),
                }))}
              />
            )}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-12 flex-1 basis-1/3">
          <Card className="w-full h-fit">
            <CardHeader>
              <CardTitle>Choose snapshot range</CardTitle>
            </CardHeader>
            <CardContent>
              <RangeSlider
                className="w-full h-8"
                defaultValue={[0, maxSliderValue]}
                min={0}
                max={maxSliderValue}
                value={[range.lower, range.upper]}
                onChange={(e) => setRange({ ...range, lower: e[0], upper: e[1] + 1 })}
              />
            </CardContent>
          </Card>
          {massifOutputs.length > 1 && (
            <MassifFileSelector
              massifOutputs={massifOutputs}
              labels={labels}
              setSelectedMassifOutput={setSelectedMassifOutput}
            />
          )}

          {selectedMassifOutput ? (
            <Card className="w-full h-fit">
              <CardHeader>
                <CardTitle>Snapshots</CardTitle>
                <CardDescription>
                  Preview of the heap tree snapshots for the selected file
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SnapshotTree
                  snapshots={selectedMassifOutput.snapshots.slice(range.lower, range.upper)}
                  selectedHeapNode={selectedHeapNode}
                  setSelectedHeapNode={setSelectedHeapNode}
                />
              </CardContent>
            </Card>
          ) : (
            <p className="text-xl text-center">Select a Massif file to view its heap tree</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnapshotStatistics;
