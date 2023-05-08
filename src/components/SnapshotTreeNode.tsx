import { HeapNode } from "@/types/massif";
import { cn } from "@/utils/styleUtils";

interface SnapshotTreeNodeProps {
  node: HeapNode;
  selectedHeapNode: HeapNode | undefined;
  setSelectedHeapNode: React.Dispatch<React.SetStateAction<HeapNode | undefined>>;
}

const SnapshotTreeNode = (props: SnapshotTreeNodeProps) => {
  const { node, selectedHeapNode, setSelectedHeapNode } = props;
  return (
    <div className="ml-2 flex flex-col gap-1">
      <div
        key={-1}
        onClick={() => {
          if (node === selectedHeapNode) {
            setSelectedHeapNode(undefined);
          } else {
            setSelectedHeapNode(node);
          }
        }}
        className={cn(
          "bg-blue-500 rounded-lg p-2 text-white text-sm hover:bg-blue-800",
          node === selectedHeapNode ? "bg-blue-800" : "",
        )}
      >{`${node.nbytes} ${
        node.details ? `${node.details.function} ${node.details.file}:${node.details.line}` : ""
      }`}</div>
      {node.children.map((child, i) => (
        <SnapshotTreeNode
          key={i}
          node={child}
          selectedHeapNode={selectedHeapNode}
          setSelectedHeapNode={setSelectedHeapNode}
        />
      ))}
    </div>
  );
};

export default SnapshotTreeNode;
