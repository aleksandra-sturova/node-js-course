import fs from 'fs';
import path from 'path';
import minimist from 'minimist';

/**
 *Parse the command line arguments using minimist
 * @returns {Object}
 */
export function parseArgumentOptions(argv) {
  return minimist(argv.slice(2), {
    alias: {
      a: 'action',
      f: 'file',
      h: 'help',
    },
    unknown: (param) => {
      /* Point 5: throw error if streams.js util does not contain an action passed */
      throw new Error(`Argument "${param}" is uknown. Use "--help" to see available options.`);
    },
  });
}

/**
 * Check file existance and return resolved file path
 * @param {String} filePath
 */
export function resolveFilePath(filePath) {
  const resolvedPath = path.resolve(filePath);

  /* Point 5: throw error if received argument is invalid */
  if (!filePath || !fs.existsSync(resolvedPath)) {
    throw new Error(`Error: Invalid file path - ${filePath}`);
  }

  return resolvedPath;
}


/**
 * Print help message to console
 */
export function printHelpMessage() {
  console.log(`
  Usage: node streams.js --action <action> <option> -file FILE

  Options:
    -a, --action    action name.
        common options: [ --outputFile |--transform ]
        -outputFile     
        -transform

    -f, --file      specify file path for 'outputFile' and 'transform' options.
    -h , --help     show this message.
  `);
}
