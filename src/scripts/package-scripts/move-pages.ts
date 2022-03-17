import { copyFolderRecursiveSync } from "../../library/copy-folder-recursive-sync";

const source = "src/pages";

const target = "dist";

copyFolderRecursiveSync(source, target);
