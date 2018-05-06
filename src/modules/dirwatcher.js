import fs from 'fs';
import EventEmitter from 'events';
import { differenceWith, isEqual } from 'lodash';

export class DirWatcher extends EventEmitter {
  constructor(props) {
    super(props);
    this.files = [];
  }

  watch(path, timeout) {
    const watcherFunc = () => {
      const currentFiles = fs.readdirSync(path);

      if (currentFiles && currentFiles.length !== this.files.length) {
        const changedFiles = differenceWith(currentFiles, this.files, !isEqual);
        console.log('emit dirwatcher:changed', changedFiles);
        this.emit('dirwatcher:changed', changedFiles, path);
      }

      this.files = currentFiles;
    };

    setInterval(watcherFunc, timeout, path);
  }
}
