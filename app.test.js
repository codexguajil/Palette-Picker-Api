const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const request = require('supertest');
const app = require('./app');
const projects = require('./projects');
const palettes = require('./palettes');


describe('/api/v1', () => {

  beforeEach(async () => {
    await database.seed.run()
  })

  describe('GET /projects', () => {

    it('should return all `projects` in the database', async () => {
      const expectedProjectsLength = projects.length;
      const response = await request(app).get('/api/v1/projects');
      const result = response.body;
      expect(result.length).toEqual(expectedProjectsLength);
    })

  })

  describe('GET/ projects/:id', () => {

    it('should return a specific `project` from the database', async () => {
      const expectedProject = await database('projects').first();
      const id = expectedProject.id;

      const response = await request(app).get(`/api/v1/projects/${id}`);

      expect(response.body[0].id).toEqual(expectedProject.id);
      expect(response.body[0].title).toEqual(expectedProject.title);
    })

    it('should return a 404 status code and error message if `project` is not found', async () => {
      const fakeId = 1;

      const response = await request(app).get(`/api/v1/projects/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`Could not find a project with id ${fakeId}`);
    })

    it.skip('should return a 500 status code and an error object', async () => {
      const id = 'Q';

      const response = await request(app).get(`/api/v1/projects/${id}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual({"code": "22P02", "file": "numutils.c", "length": 90, "line": "62", "name": "error", "routine": "pg_atoi", "severity": "ERROR"});
    })

  })
  
  describe('GET /palettes', () => {

    it('should return all `palettes` in the database', async ()=> {
      const expectedPalettes = palettes.length;

      const response = await request(app).get('/api/v1/palettes');

      expect(response.body.length).toEqual(expectedPalettes);
    })

  })
  
  describe('GET /palettes/:id', () => {

    it('should return a specific `palette` from the database', async () => {
      const expectedPalette = await database('palettes').first();
      const id = expectedPalette.id;

      const response = await request(app).get(`/api/v1/palettes/${id}`);

      expect(response.body[0].id).toBe(expectedPalette.id);
    })

    it('should return a 404 status code and error message if `palette` is not found', async () => {
      const fakeId = 1;

      const response = await request(app).get(`/api/v1/palettes/${fakeId}`);
      
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`Could not find a palette with id ${fakeId}`);
    })

    it.skip('should return a 500 status code and an error object', async () => {
      const id = 'Q';

      const response = await request(app).get(`/api/v1/palettes/${id}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual({"code": "22P02", "file": "numutils.c", "length": 90, "line": "62", "name": "error", "routine": "pg_atoi", "severity": "ERROR"});
    })

  })

  describe('POST /projects', () => {

    it('should add a `project` to the database', async () => {
      const newProject = { title: 'Test Project' };

      const response = await request(app).post('/api/v1/projects').send(newProject);
      const project = await database('projects').where('id', response.body.id).select();

      expect(project[0].title).toEqual(newProject.title);
    })

    it('should return a 422 status code and an error message', async () => {
      const newProject = { tijle: 'Test Project' };

      const response = await request(app).post('/api/v1/projects').send(newProject);

      expect(response.status).toBe(422);
      expect(response.body.error).toEqual("Expected format: { title: <String> }. You're missing a \"title\" property.");
    })

  })

  describe('POST /palettes', () => {

    it('should add a `palette` to the database', async () => {
      const newPalette = { 
        name: 'Test palette', 
        color1: 'red', 
        color2: 'green', 
        color3: 'orange', 
        color4: 'purple', 
        color5: 'white'
      };

      const response = await request(app).post('/api/v1/palettes').send(newPalette);
      const palette = await database('palettes').where('id', response.body.id).select();

      expect(palette[0].name).toEqual(newPalette.name);
    })

    it('should return a 422 status code and an error message', async () => {
      const newPalette = { 
        name: 'Test palette', 
        color1: 'red'
      };

      const response = await request(app).post('/api/v1/palettes').send(newPalette);
      let errorMessage = "Expected format: { name: <String>, color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>}. You're missing a \"color2\" property.";
      
      expect(response.status).toBe(422);
      expect(response.body.error).toEqual(errorMessage);
    })

  })

  describe('DELETE/ projects/:id', () => {

    it('should delete a `project` by its id', async () => {
      const expectedProject = await database('projects').first();
      const id = expectedProject.id;

      const response = await request(app).delete(`/api/v1/projects/${id}`);

      expect(response.status).toBe(204);
    })

    it('should return a 404 status code and an error message', async () => {
      const fakeId = 1;

      const response = await request(app).delete(`/api/v1/projects/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`Could not find a project with id ${fakeId}`);
    })

    it.skip('should return a 500 status code and an error object', async () => {
      const id = 'Q';

      const response = await request(app).delete(`/api/v1/projects/${id}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual({"code": "22P02", "file": "numutils.c", "length": 90, "line": "62", "name": "error", "routine": "pg_atoi", "severity": "ERROR"});
    })

  })

  describe('DELETE/ palettes/:id', () => {

    it('should delete a `palette` by its id', async () => {
      const expectedPalette = await database('palettes').first();
      const id = expectedPalette.id;

      const response = await request(app).delete(`/api/v1/palettes/${id}`);

      expect(response.status).toBe(204);
    })

    it('should return a 404 status code and an error message', async () => {
      const fakeId = 1;

      const response = await request(app).delete(`/api/v1/palettes/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(`Could not find a palette with id ${fakeId}`);
    })

    it.skip('should return a 500 status code and an error object', async () => {
      const id = 'Q';

      const response = await request(app).delete(`/api/v1/palettes/${id}`);

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual({"code": "22P02", "file": "numutils.c", "length": 90, "line": "62", "name": "error", "routine": "pg_atoi", "severity": "ERROR"});
    })

  })

})