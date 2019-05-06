const express = require('express')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express()
app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.get('/', (req, res) => res.send('Hello Girl!'))

app.listen(app.get('port'), () => console.log(`Example app listening on port ${app.get('port')}!`))

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});