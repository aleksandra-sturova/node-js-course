import fs from 'fs';
/* Taken from http://2ality.com/2017/05/util-promisify.html */
import { promisify } from 'util';
/* Taken from and refactored a bit https://gist.github.com/iwek/7154578#file-csv-to-json-js */
import cvsToJson from './cvs-to-json-converter';

const readPromise = promisify(fs.readFile);

export class Importer {
  static listen(watcher) {
    return watcher.on('change', (path) => {
      console.log('entered on change listener, path:', path);
      this.importAsync(path);
    });
  }

  static importAsync(path) {
    return readPromise(path)
      .then((data) => {
        const jsonData = cvsToJson(data);
        console.log('Recieved Json Data ( async )', jsonData);
        return jsonData;
      })
      .catch(err => console.log('An error occured while async reading: ', err));
  }

  static importSync(path) {
    const jsonDatadata = cvsToJson(fs.readFile(path));
    console.log('Recieved Json Data ( sync )', jsonData);
    return jsonData;
  }
}
