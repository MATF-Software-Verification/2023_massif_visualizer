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
  const outputFolderPath = sourceFilePath.split("/").slice(0, -1).join("/");
  const fileExtension = sourceFilePath.split(".").slice(-1)[0];
  const compiler = fileExtension === "c" ? "gcc" : "g++";

  exec(`${compiler} -g ${sourceFilePath} -o ${outputFolderPath}/a.out`, (error, stdout, stderr) => {
    if (error) {
      setMassifOutputsWithError({ error: error.message, massifOutputs: [] });
    } else {
      logStdErr(compiler, stderr);
      exec(
        `valgrind --tool=massif --massif-out-file=${outputFolderPath}/sourceMassif.out.0 ${outputFolderPath}/a.out`,
        (error, stdout, stderr) => {
          if (error) {
            setMassifOutputsWithError({ error: error.message, massifOutputs: [] });
          } else {
            logStdErr("massif", stderr);
            parseMassif([`${outputFolderPath}/sourceMassif.out.0`], setMassifOutputsWithError);
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
  exec(`python3 src/utils/parser.py ${massifFilePaths.join(" ")}`, (error, stdout, stderr) => {
    if (error) {
      setMassifOutputsWithError({ error: error.message, massifOutputs: [] });
    } else {
      logStdErr("parser", stderr);
      setMassifOutputsWithError({ massifOutputs: JSON.parse(stdout) as MassifOutput[] });
    }
  });
};
