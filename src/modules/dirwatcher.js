import fs from 'fs';

export class DirWatcher {
  static watch(path) {
    fs.watch(path, (event) => {
      console.log('event', event);
      console.log('path', path);
    });
  }
}
