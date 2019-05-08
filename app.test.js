const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const request = require('supertest');
const app = require('./app');
const projects = require('./projects');

describe('/api/v1', () => {

  beforeEach(async () => {
    await database.seed.run()
  })

  describe('GET /projects', () => {

    it('should return all projects in the database', async () => {
      const expectedProjectsLength = projects.length;
      const response = await request(app).get('/api/v1/projects');
      const result = response.body;
      expect(result.length).toEqual(expectedProjectsLength);
    })

  })

})