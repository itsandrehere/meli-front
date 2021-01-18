
// Import express
const express = require('express');
const fetch = require('node-fetch');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const apiUrl = "https://api.mercadolibre.com/";

app.use(bodyParser.json());
app.use(cors());

app.get('/items', (req, response) => {
  const query = req.query.search;
  fetch(`${apiUrl}sites/MLA/search?q=${query}`)
    .then(res => res.json())
    .then(json => {response.send(json)})
    .catch(err => console.error(err));
})

app.get('/items/:id', (req, response) => {
  const id = req.params.id;

  Promise.all([
    fetch(`${apiUrl}items/${id}`),
    fetch(`${apiUrl}items/${id}/description`)
  ]).then(function (res) {
    return Promise.all(res.map(function (res) {
      return res.json();
    }));
  }).then(function (data) {
    response.send({
      detail: data[0],
      description: data[1]
    });
  }).catch(function (error) {
    console.error(error)
  });
})

app.get('/', (req, res) => {
  res.send({
    status: 'online'
  })
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});