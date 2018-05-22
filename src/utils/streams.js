import fs from 'fs';
import csv from 'csv';
import through from 'through2';
import { parseArgumentOptions, printHelpMessage, resolveFilePath } from './helpers';

/**
 * Point 6.a: reverse string data from process.stdin to process.stdout
 */
function reverse() {
  process.stdin
    .pipe(through((buffer) => {
      process.stdout.write(buffer.toString().split('').reverse().join(''));
      process.exit(0);
    }));
}

/**
 * Point 6.b: convert data from process.stdin to upper-cased data on process.stdout
 */
function transform() {
  process.stdin
    .pipe(through(function (buffer) {
      this.push(buffer.toString().toUpperCase());
      process.exit(0);
    }))
    .pipe(process.stdout);
}

/**
 * Point 6.c: pipe the given file provided by --file option to process.stdout
 * @param {String} file
 */
function outputFile({ file }) {
  const resolvedPath = resolveFilePath(file);
  fs.createReadStream(resolvedPath).pipe(process.stdout);
}

/**
 * Outputs data to a result file as json call process.stdout
 * @param {Object} file
 * @param {Boolean} saveJson
 */
function convert(file, saveJson = false) {
  const resolvedPath = resolveFilePath(file);
  const reader = fs.createReadStream(resolvedPath);
  const newFileName = `${file.slice(0, file.lastIndexOf('.'))}.json`;
  const logData = saveJson ? fs.createWriteStream(newFileName) : process.stdout;
  const csvStream = csv.parse().on('data', data => logData.write(JSON.stringify(data)));

  reader.pipe(csvStream);
}

/**
 * Point 6.d: output data using process.stdout
 * @param {String} file
 */
function convertFromFile({ file }) {
  convert(file);
}

/**
 * Point 6.e: output data to a result file as json
 * @param {String} file
 */
function convertToFile({ file }) {
  convert(file, true);
}

/**
 * Calls method according to action
 * @param {Object} options
 */
export function runAction(options) {
  const methods = {
    reverse,
    transform,
    outputFile,
    convertFromFile,
    convertToFile,
  };

  return methods[options.action](options);
}

/**
 * Processes user's input value in command line
 */
export function processUserInput() {
  const options = parseArgumentOptions(process.argv);

  if (!options.action && !options.help) {
    /* Point 3: notify user about wrong input if module is called without arguments */
    console.error('Error: Invalid input!');
    printHelpMessage();
  }

  return options.help
    ? printHelpMessage()
    : runAction(options);
}
