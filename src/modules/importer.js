import fs from 'fs';
import { promisify } from 'util';
// import csv from 'csvtojson';

const readFilePromise = promisify(fs.readFile);

export class Importer {
  static listen(watcher) {
    watcher.on('dirwatcher:changed', (files, path) => {
      console.log('Importer catched event', 'files', files, 'paths', path);
      if (files.length) {
        this.importAsync(files, path);
      }
    });
  }

  static importAsync(files, path) {
    const readPromisesArr = files.map(file => readFilePromise(`${path}/${file}`));
    Promise.all(readPromisesArr)
      .then((filesData) => {
        filesData.forEach((file) => {
          console.log(file.toString());
          /* implement data parsing and log to console */
        });
      });
  }

  static importSync(files, path) {
    files.forEach((file) => {
      const fileData = fs.readFileSync(`${path}/${file}`);
      console.log(fileData.toString());
      /* implement data parsing and log to console */
    });
  }
}
