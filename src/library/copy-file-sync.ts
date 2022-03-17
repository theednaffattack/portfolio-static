import fse from "fs-extra";
import path from "path";

// https://stackoverflow.com/a/26038979/9448010

export function copyFileSync(source: string, target: string) {
  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fse.existsSync(target)) {
    if (fse.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fse.writeFileSync(targetFile, fse.readFileSync(source));
}
