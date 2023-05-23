import { useState } from "react";
import { useLocation } from "react-router-dom";

import { HeapNode, MassifOutput } from "@/types/massif";

import SnapshotStatistics from "./components/SnapshotStatistics";
import SourceCodeViewer from "./components/SourceCodeViewer";

const Stats = () => {
  const location = useLocation();
  const { massifOutputs, sourceCode, labels } = location.state as {
    massifOutputs: MassifOutput[];
    sourceCode: string;
    labels: string[];
  };

  const [selectedHeapNode, setSelectedHeapNode] = useState<HeapNode>();

  return (
    <div className="flex flex-row justify-between gap-4 h-screen w-screen">
      <SnapshotStatistics
        massifOutputs={massifOutputs}
        labels={labels}
        selectedHeapNode={selectedHeapNode}
        setSelectedHeapNode={setSelectedHeapNode}
      />

      <SourceCodeViewer
        sourceFile={labels[0]}
        sourceCode={sourceCode}
        selectedHeapNode={selectedHeapNode}
      />
    </div>
  );
};

export default Stats;
