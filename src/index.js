import app from './app';

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening on port ${port}! Open docs: http://localhost:${port}/node-js-api/docs/`));

