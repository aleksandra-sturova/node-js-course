import http from 'http';
import fs from 'fs';

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  const fileContent = fs.readFileSync('index.html', { encoding: 'utf8' });
  res.end(fileContent.replace('{message}', 'This is a message from server.'));
}).listen(8080);