import { copyFolderRecursiveSync } from "../../library/copy-folder-recursive-sync";

const source = "src/public";

const target = "dist";

copyFolderRecursiveSync(source, target);
