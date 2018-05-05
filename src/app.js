import { DirWatcher, Importer } from './modules';


const dirWatcher = DirWatcher.watch('../data');
Importer.listen(dirWatcher);
