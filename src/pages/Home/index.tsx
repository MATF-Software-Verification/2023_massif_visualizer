import { readFileSync } from "fs";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FileWithPath } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useToast } from "@/components/ui/useToast";
import { MassifOutputsWithError } from "@/types/massif";
import { compileAndParseMassif, parseMassif } from "@/utils/parseMassif";

const Home = () => {
  const { toast } = useToast();

  const navigate = useNavigate();

  const sourceFileRef = useRef<HTMLInputElement>(null);
  const massifFilesRef = useRef<HTMLInputElement>(null);

  const [labels, setLabels] = useState<string[]>([]);
  const [sourceCode, setSourceCode] = useState("");
  const [massifOutputsWithError, setMassifOutputsWithError] = useState<MassifOutputsWithError>({
    massifOutputs: [],
    error: undefined,
  });

  const [processingSourceFile, setProcessingSourceFile] = useState(false);
  const [processingMassifFiles, setProcessingMassifFiles] = useState(false);

  const handleSourceCodeInspection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessingSourceFile(true);

    if (!sourceFileRef.current?.files?.[0]) {
      toast({
        title: "Error",
        description: "Please upload a source code file.",
        variant: "destructive",
      });
      setProcessingSourceFile(false);
      return;
    }

    try {
      const sourceFile = sourceFileRef.current?.files?.[0] as FileWithPath;
      const _sourceCode = readFileSync(sourceFile.path || "", "utf-8");
      setSourceCode(_sourceCode);
      setLabels([sourceFile.name]);

      compileAndParseMassif(sourceFile.path || "", setMassifOutputsWithError);
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong while inspecting the source code.",
        variant: "destructive",
      });
      setProcessingSourceFile(false);
    }
  };

  const handleMassifFileUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessingMassifFiles(true);

    if (!massifFilesRef.current?.files?.length) {
      toast({
        title: "Error",
        description: "Please upload at least one Massif file.",
        variant: "destructive",
      });
      setProcessingMassifFiles(false);
      return;
    }

    try {
      const massifFiles = massifFilesRef.current?.files || [];
      const massifPaths = Array.from(massifFiles).map((file: FileWithPath) => file.path || "");
      setLabels(Array.from(massifFiles).map((file: File) => file.name));

      parseMassif(massifPaths, setMassifOutputsWithError);
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong while parsing the Massif files.",
        variant: "destructive",
      });
      setProcessingMassifFiles(false);
    }
  };

  useEffect(() => {
    if (massifOutputsWithError?.massifOutputs.length > 0 && !massifOutputsWithError.error) {
      navigate("/stats", {
        state: { massifOutputs: massifOutputsWithError.massifOutputs, labels, sourceCode },
      });
      setProcessingSourceFile(false);
      setProcessingMassifFiles(false);
    } else if (massifOutputsWithError.error) {
      toast({
        title: "Error",
        description: massifOutputsWithError.error,
        variant: "destructive",
      });
      setProcessingSourceFile(false);
      setProcessingMassifFiles(false);
    }
  }, [labels, massifOutputsWithError, navigate, sourceCode, toast]);

  return (
    <div className="flex flex-col gap-6 h-screen w-screen justify-center items-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome to Massif Visualizer!
      </h1>

      <div className="w-full flex flex-row justify-around">
        <form
          onSubmit={handleSourceCodeInspection}
          className="grid w-full max-w-sm items-center gap-1.5"
        >
          <Label htmlFor="sourcecode">Upload source code</Label>
          <Input
            id="sourcecode"
            name="sourcecode"
            type="file"
            accept=".c,.cpp"
            ref={sourceFileRef}
          />
          <Button disabled={processingSourceFile}>
            {processingSourceFile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Inspect
          </Button>
        </form>

        <form
          className="grid w-full max-w-sm items-center gap-1.5"
          onSubmit={handleMassifFileUpload}
        >
          <Label htmlFor="massif">Upload Massif file(s)</Label>
          <Input id="massif" type="file" multiple accept=".out.*" ref={massifFilesRef} />
          <Button disabled={processingMassifFiles}>
            {processingMassifFiles && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Compare
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
