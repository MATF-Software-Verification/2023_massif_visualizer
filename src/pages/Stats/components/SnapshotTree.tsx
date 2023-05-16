import { ChevronDown, ChevronRight } from "lucide-react";
import * as React from "react";

import { HeapNode, MassifSnapshot } from "@/types/massif";
import { cn } from "@/utils/styleUtils";

import SnapshotTreeNode from "./SnapshotTreeNode";

interface ISnapshotTreeProps {
  snapshots: MassifSnapshot[];
  selectedHeapNode: HeapNode | undefined;
  setSelectedHeapNode: React.Dispatch<React.SetStateAction<HeapNode | undefined>>;
}

const SnapshotTree = ({
  snapshots: _snapshots,
  selectedHeapNode,
  setSelectedHeapNode,
}: ISnapshotTreeProps) => {
  const [snapshots, setSnapshots] = React.useState<MassifSnapshot[]>(_snapshots);

  React.useEffect(() => {
    setSnapshots(_snapshots);
  }, [_snapshots]);

  const openSnapshot = (snapshot: MassifSnapshot) => {
    if (snapshot.heap_tree) {
      setSnapshots((prev) =>
        prev.map((ss) => (ss.id === snapshot.id ? { ...ss, opened: !ss.opened } : ss)),
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-[300px] overflow-y-auto">
      {snapshots.map((snapshot) => (
        <div key={`snapshot${snapshot.id}`} className={"flex flex-col gap-1 mb-1"}>
          <div
            className={cn(
              "p-1 flex rounded-lg text-sm hover:bg-accent cursor-pointer",
              snapshot.opened && "bg-slate-300 dark:bg-slate-700",
            )}
            onClick={() => openSnapshot(snapshot)}
          >
            <div className="flex w-full justify-between">
              <div className="flex items-center">
                {!!snapshot.heap_tree && (
                  <>
                    {snapshot.opened ? (
                      <ChevronDown className="-ml-2 w-5 h-5" />
                    ) : (
                      <ChevronRight className="-ml-2 w-5 h-5" />
                    )}
                  </>
                )}
                <p>Snapshot {snapshot.id}</p>
              </div>
              <p>Memory: {snapshot.mem_heap}</p>
            </div>
          </div>
          {snapshot.opened && !!snapshot.heap_tree && (
            <>
              {snapshot.heap_tree.children.map((child, i) => (
                <SnapshotTreeNode
                  key={i}
                  node={child}
                  selectedHeapNode={selectedHeapNode}
                  setSelectedHeapNode={setSelectedHeapNode}
                />
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default SnapshotTree;
