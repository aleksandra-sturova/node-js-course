import { DirWatcher, Importer } from './modules';

const dirWatcher = new DirWatcher();
dirWatcher.watch(`${process.cwd()}/data`, 8000);
Importer.listen(dirWatcher);
