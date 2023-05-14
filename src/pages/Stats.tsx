import { readFileSync } from "fs";
import { useEffect, useState } from "react";
import { FileWithPath } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";

import LineChart from "@/components/LineChart";
import SnapshotTreeNode from "@/components/SnapshotTreeNode";
import { HeapNode, MassifOutput } from "@/types/massif";
import { compileAndParseMassif, parseMassif } from "@/utils/parseMassif";
import { cn } from "@/utils/styleUtils";

const Stats = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [range, setRange] = useState<{ lower: number; upper: number }>({
    lower: 0,
    upper: Infinity,
  });
  const [labels, setLabels] = useState<string[]>([]);
  const [massifOutputs, setMassifOutputs] = useState<MassifOutput[]>([]);
  const [selectedHeapNode, setSelectedHeapNode] = useState<HeapNode | undefined>(undefined);
  const [sourceCode, setSourceCode] = useState("");

  useEffect(() => {
    if (location.state.sourceFile) {
      const sourceFile = location.state.sourceFile as FileWithPath;
      compileAndParseMassif(sourceFile.path || "", setMassifOutputs);
      const text = readFileSync(sourceFile.path || "", "utf-8");
      setSourceCode(text);
      setLabels([sourceFile.name]);
    } else if (location.state.massifFiles) {
      const massifFiles = Array.from(location.state.massifFiles as FileList);
      const massifPaths = massifFiles.map((file: FileWithPath) => file.path || "");
      parseMassif(massifPaths, setMassifOutputs);
      setLabels(massifFiles.map((file) => file.name));
    }
  }, []);

  return (
    <div className="flex flex-row justify-between gap-4 bg-slate-200 h-screen w-screen">
      <div className="h-full flex flex-col flex-grow w-1/2 px-4 pb-8 gap-8 justify-center items-center">
        <div
          className="cursor-pointer px-1 mt-1 place-self-start rounded bg-blue-600"
          onClick={() => {
            navigate(`/home`);
          }}
        >
          Home
        </div>
        <div className="w-full h-full">
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
        </div>
        <div className="flex flex-row justify-around w-full">
          <label htmlFor="rangeLower">
            Min
            <input
              type="number"
              id="rangeLower"
              className="w-20 ml-2"
              min="0"
              onChange={(ev) =>
                setRange({ ...range, lower: Number.parseInt(ev.target.value) || 0 })
              }
            />
          </label>
          <label htmlFor="rangeUpper">
            Max
            <input
              type="number"
              id="rangeUpper"
              className="w-20 ml-2"
              min="0"
              onChange={(ev) => {
                if (ev.target.value === "") {
                  setRange({ ...range, upper: Infinity });
                } else {
                  setRange({ ...range, upper: Number.parseInt(ev.target.value) });
                }
              }}
            />
          </label>
        </div>
      </div>
      <div className={cn("h-full flex flex-row", sourceCode !== "" ? "w-1/2" : "")}>
        <div className="h-full flex flex-col gap-2 overflow-y-auto">
          {massifOutputs.map((massifOutput, idx) => (
            <div
              key={`${idx}${massifOutput.cmd}`}
              className="flex flex-col px-1 rounded border border-black"
            >
              <p className="text-lg text-center mb-2">{labels[idx]}</p>
              {massifOutput?.snapshots.map((snapshot) => (
                <div key={`snapshot${snapshot.id}`} className={"flex flex-col gap-1 mb-1"}>
                  <div
                    className={cn(
                      "bg-blue-500 p-3 flex rounded-lg text-white hover:bg-blue-800",
                      snapshot.heap_tree ? "bg-blue-600" : "",
                      snapshot.opened ? "bg-blue-800" : "",
                    )}
                    onClick={() => {
                      if (snapshot.heap_tree) {
                        setMassifOutputs(
                          massifOutputs.map((output) => {
                            if (output === massifOutput) {
                              return {
                                ...massifOutput,
                                snapshots: massifOutput.snapshots.map((ss) => {
                                  if (ss.id === snapshot.id) return { ...ss, opened: !ss.opened };
                                  else return ss;
                                }),
                              };
                            } else return output;
                          }),
                        );
                      }
                    }}
                  >{`Snapshot ${snapshot.id}, mem: ${snapshot.mem_heap}`}</div>
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
          ))}
        </div>
        <div
          className={cn(
            "h-full flex flex-row flex-grow bg-slate-800 p-3 overflow-auto",
            sourceCode === "" ? "hidden" : "",
          )}
        >
          <div className="h-full">
            {sourceCode.split("\n").map((line, i) => (
              <div key={`${i}${line}`} className="text-slate-200 h-6">
                {`${i + 1}. `}
              </div>
            ))}
          </div>
          <div className="h-full">
            {sourceCode.split("\n").map((line, i) => (
              <pre
                key={`${i}${line}`}
                className={cn(
                  "text-slate-200 h-6",
                  i + 1 === selectedHeapNode?.details?.line ? "bg-orange-400" : "",
                )}
              >
                {line}
              </pre>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
