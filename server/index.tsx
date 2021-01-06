import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as path from 'path';
import * as fs from 'fs';
import App from '../src/App';

const app = express();
const PORT = 8000;
app.use(express.static('build', { maxAge: '30d' }));
app.get('*', (req, res) => {
  // get the html file created with the create-react-app build
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  console.log('file', filePath);

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
        console.error('err', err);
        return res.status(404).end();
    }

    const html = ReactDOMServer.renderToString(<App/>);

    // now inject the rendered app into our html and send it to the client
    return res.send(
        htmlData
    );
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
