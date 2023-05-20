import { Highlight, themes } from "prism-react-renderer";

import { HeapNode } from "@/types/massif";
import { cn } from "@/utils/styleUtils";

interface ISourceCodeViewerProps {
  sourceCode: string;
  selectedHeapNode: HeapNode | undefined;
}

const SourceCodeViewer = ({ sourceCode, selectedHeapNode }: ISourceCodeViewerProps) => {
  return (
    <div
      className={cn(
        "h-full flex flex-row bg-foreground text-backgroundoverflow-auto",
        sourceCode === "" ? "hidden" : "",
      )}
    >
      <Highlight code={sourceCode} language="cpp" theme={themes.vsDark}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={style} className={cn(className, "h-full w-full p-3 pr-40")}>
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className={cn(
                  "flex gap-4",
                  i + 1 === selectedHeapNode?.details?.line && "bg-slate-500",
                )}
              >
                <span>{i + 1}</span>
                <div>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default SourceCodeViewer;
