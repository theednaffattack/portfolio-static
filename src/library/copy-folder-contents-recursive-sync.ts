import fse from "fs-extra";
import path from "path";
import { copyFileSync } from "./copy-file-sync";

// Adapted from: https://stackoverflow.com/a/26038979/9448010

export function copyFolderContentsRecursiveSync(
  source: string,
  target: string
) {
  // Check if folder needs to be created or integrated
  // const targetFolder = path.join(target, path.basename(source));
  const targetFolder = path.resolve(target);

  if (!fse.existsSync(targetFolder)) {
    fse.mkdirSync(targetFolder);
  }

  // Copy
  if (fse.lstatSync(source).isDirectory()) {
    const theFiles = fse.readdirSync(source);

    theFiles.forEach(function (file) {
      const curSource = path.join(source, file);
      if (fse.lstatSync(curSource).isDirectory()) {
        copyFolderContentsRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}
