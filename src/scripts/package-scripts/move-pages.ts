import { copyFolderContentsRecursiveSync } from "../../library/copy-folder-contents-recursive-sync";

const source = "src/pages";

const target = "dist";

copyFolderContentsRecursiveSync(source, target);
