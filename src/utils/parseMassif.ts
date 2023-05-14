import { exec } from "child_process";

import { MassifOutput } from "@/types/massif";

export const compileAndParseMassif: (
  sourceFilePath: string,
  setMassifOutputs: React.Dispatch<React.SetStateAction<MassifOutput[]>>,
) => void = (sourceFilePath, setMassifOutputs) => {
  // get directory of source file
  const outputFolderPath = sourceFilePath.split("/").slice(0, -1).join("/");
  //compile
  exec(`gcc -g ${sourceFilePath} -o ${outputFolderPath}/a.out`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
    } else if (stderr) {
      console.log(stderr);
    } else {
      // console.log(stdout);
    }
    exec(
      `valgrind --tool=massif --massif-out-file=${outputFolderPath}/sourceMassif.out.0 ${outputFolderPath}/a.out`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
        } else if (stderr) {
          console.log(stderr);
        } else {
          // console.log(stdout);
        }
        parseMassif([`${outputFolderPath}/sourceMassif.out.0`], setMassifOutputs);
      },
    );
  });
  //run valgrind for executable
  //parseMassif
};

export const parseMassif: (
  massifFilePaths: string[],
  setMassifOutputs: React.Dispatch<React.SetStateAction<MassifOutput[]>>,
) => void = (massifFilePaths, setMassifOutputs) => {
  exec(`python3 src/utils/parser.py ${massifFilePaths.join(" ")}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
    } else if (stderr) {
      console.log(stderr);
    } else {
      // console.log(stdout);
      setMassifOutputs(JSON.parse(stdout) as MassifOutput[]);
    }
  });
};
