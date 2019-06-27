const express = require('express');
const app = express();
const PORT = process.env.PORT || 1337;
const api = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/data', api);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
