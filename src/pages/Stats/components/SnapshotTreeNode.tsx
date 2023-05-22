import { ChevronDown } from "lucide-react";

import { HeapNode } from "@/types/massif";
import { cn } from "@/utils/styleUtils";

interface SnapshotTreeNodeProps {
  node: HeapNode;
  selectedHeapNode: HeapNode | undefined;
  setSelectedHeapNode: React.Dispatch<React.SetStateAction<HeapNode | undefined>>;
}

const SnapshotTreeNode = ({
  node,
  selectedHeapNode,
  setSelectedHeapNode,
}: SnapshotTreeNodeProps) => {
  const labelText = node.details
    ? `File: ${node.details.file ?? "Unknown"} | Function: ${
        node.details.function ?? "Unknown"
      } | Line: ${node.details.line ?? "Unknown"}`
    : "Unknown";

  return (
    <div className="ml-2 flex flex-col gap-1">
      <div
        onClick={() => setSelectedHeapNode(selectedHeapNode === node ? undefined : node)}
        className={cn(
          "p-1 flex rounded-lg text-xs hover:bg-accent cursor-pointer",
          node === selectedHeapNode && "bg-slate-300 dark:bg-slate-700",
        )}
      >
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            {node.children.length > 0 && <ChevronDown className="-ml-2 w-5 h-5" />}
            <p className="break-all"> {labelText}</p>
          </div>
          <p>Memory: {node.nbytes}</p>
        </div>
      </div>
      {node.children.map((child) => (
        <SnapshotTreeNode
          key={crypto.randomUUID()}
          node={child}
          selectedHeapNode={selectedHeapNode}
          setSelectedHeapNode={setSelectedHeapNode}
        />
      ))}
    </div>
  );
};

export default SnapshotTreeNode;
