const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express()

const cors = require('cors');
app.use(cors());

let whitelist = ['http://localhost:3001', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.json())

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

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['title']) {
    if (!project[requiredParameter]) {
      return response 
        .status(422)
        .send({ error: `Expected format: { title: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  for (let requiredParameter of ['name', 'color1', 'color2', 'color3', 'color4', 'color5']) {
    if(!palette[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>}. You're missing a "${requiredParameter}" property.`});
    }
  }

  database('palettes').insert(palette, 'id')
    .then(palette => {
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})

app.get('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects)
      } else {
        response.status(404).json({
          error: `Could not find a project with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes)
      } else {
        response.status(404).json({
          error: `Could not find a palette with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})

app.get('/api/v1/projects/:id/palettes', (request, response) => {
  database('palettes').where('project_id', request.params.id).select()
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes);
      } else {
        response.status(404).json({ 
          error: `Could not find palettes with project id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/projects/:id', (request, response) => {
  database('projects').where('id', request.params.id).select()
    .then(projects => {
      if(!projects.length) {
        return response.status(404).json({
          error: `Could not find a project with id ${request.params.id}`
        })
      }
      database('palettes').where('project_id', request.params.id).del()
        .then(() => database('projects').where('id', request.params.id).del())
        .then(() => response.sendStatus(204))
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
    .then(palettes => {
      if(!palettes.length) {
        return response.status(404).json({
          error: `Could not find a palette with id ${request.params.id}`
        })
      }
      database('palettes').where('id', request.params.id).del()
        .then(() => response.sendStatus(204))
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/projects/:id', (request, response) => {
  const {title} = request.body
  database('projects').where('id', request.params.id).select()
    .then(projects => {
      if(!projects.length) {
        return response.status(404).json({
          error: `Could not find a project with id ${request.params.id}`
        })
      }
      database('projects').where('id', request.params.id).update('title', title)
        .then(() => response.status(203).json('updated project title'))
    })
})

app.patch('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
    .then(palettes => {
      if(!palettes.length) {
        return response.status(404).json({
          error: `Could not find a palette with id ${request.params.id}`
        })
      }
      database('palettes').where('id', request.params.id).update(request.body)
        .then(() => response.status(203).json('updated palette title'))
    })
})

module.exports = app;