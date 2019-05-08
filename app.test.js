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

    it('should return all projects in the database', async () => {
      const expectedProjectsLength = projects.length;
      const response = await request(app).get('/api/v1/projects');
      const result = response.body;
      expect(result.length).toEqual(expectedProjectsLength);
    })

  })

  describe('GET/ projects/:id sad path', () => {
    it('should return a single project', async () => {
      const id = 'Q'
      const res = await request(app).get(`/api/v1/projects/${id}`)
      expect(res.status).toBe(500)
      })
  })
  
  describe('GET /palettes', () => {
    it('should return all the palettes in the DB', async ()=> {
      const expectedpalettes = palettes.length
      const res = await request(app).get('/api/v1/palettes')
      const result = res.body
      expect(result.length).toEqual(expectedpalettes)
    })
  })
  
  describe('GET/ palettes/:id', () => {
    it('should return a single project', async () => {
      const expectedPalette = await database('palettes').first()
      const id = expectedPalette.id
      const res = await request(app).get(`/api/v1/palettes/${id}`)
      const result = res.body[0]
      expect(result.id).toBe(expectedPalette.id)
      })
  })
  
  describe('GET/ palettes/:id sad path', () => {
    it('should return a single project', async () => {
      const id = 'Q'
      const res = await request(app).get(`/api/v1/palettes/${id}`)
      expect(res.status).toBe(500)
      })
  })

})