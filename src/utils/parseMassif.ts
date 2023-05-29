import { exec } from "child_process";

import { MassifOutput, MassifOutputsWithError } from "@/types/massif";

const logStdErr = (from: string, stderr: string) => {
  if (stderr) {
    console.warn(`from: ${from}\nstderr: ${stderr}`);
  }
};

export const compileAndParseMassif: (
  sourceFilePath: string,
  setMassifOutputsWithError: React.Dispatch<React.SetStateAction<MassifOutputsWithError>>,
) => void = (sourceFilePath, setMassifOutputsWithError) => {
  const fileExtension = sourceFilePath.split(".").slice(-1)[0];
  const compiler = fileExtension === "c" ? "gcc" : "g++";

  exec(`${compiler} -g ${sourceFilePath} -o ./temp/a.out`, (error, stdout, stderr) => {
    if (error) {
      setMassifOutputsWithError({ error: error.message, massifOutputs: [] });
    } else {
      logStdErr(compiler, stderr);
      exec(
        `valgrind --tool=massif --massif-out-file=./temp/sourceMassif.out.0 ./temp/a.out`,
        (error, stdout, stderr) => {
          if (error) {
            setMassifOutputsWithError({ error: error.message, massifOutputs: [] });
          } else {
            logStdErr("massif", stderr);
            parseMassif([`./temp/sourceMassif.out.0`], setMassifOutputsWithError);
          }
        },
      );
    }
  });
};

export const parseMassif: (
  massifFilePaths: string[],
  setMassifOutputsWithError: React.Dispatch<React.SetStateAction<MassifOutputsWithError>>,
) => void = (massifFilePaths, setMassifOutputsWithError) => {
  exec(`python3 src/utils/parser.py ${massifFilePaths.join(" ")}`, {maxBuffer: Infinity}, (error, stdout, stderr) => {
    if (error) {
      setMassifOutputsWithError({ error: error.message, massifOutputs: [] });
    } else {
      logStdErr("parser", stderr);
      setMassifOutputsWithError({ massifOutputs: JSON.parse(stdout) as MassifOutput[] });
    }
  });
};
