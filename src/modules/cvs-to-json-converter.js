export function csvToJson(csvData) {
  const cvsString = csvData.toString();
  const lines = cvsString.split('\n');
  const result = [];
  const headers = lines[0].split(',');

  lines.forEach((line) => {
    const obj = {};
    const currentline = line.split(',');

    headers.forEach((header, j) => {
      obj[header] = currentline[j];
    });

    result.push(obj);
  });

  // return result - JavaScript object
  return JSON.stringify(result); // JSON
}
