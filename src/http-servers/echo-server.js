import http from 'http';

http.createServer((req, res) => {
  req.on('data', (message) => {
    console.log('Message: ', message.toString());
    res.write(message);
  });

  req.on('end', () => {
    res.end();
  });
}).listen(8080);
