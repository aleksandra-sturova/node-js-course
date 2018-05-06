import fs from 'fs';
import { promisify } from 'util';
import Papa from 'papaparse';

const readFilePromise = promisify(fs.readFile);

export class Importer {
  static listen(watcher) {
    watcher.on('dirwatcher:changed', (files, path) => {
      if (files.length) {
        this.importAsync(files, path);
      }
    });
  }

  static importAsync(files, path) {
    const readPromisesArr = files.map(file => readFilePromise(`${path}/${file}`, 'utf8'));
    Promise.all(readPromisesArr)
      .then((filesData) => {
        filesData.forEach(file => console.log('Recieved async JSON', Papa.parse(file).data));
      });
  }

  static importSync(files, path) {
    files.forEach((file) => {
      const fileData = fs.readFileSync(`${path}/${file}`, 'utf8');
      console.log('Recieved sync JSON', Papa.parse(fileData).data);
    });
  }
}
