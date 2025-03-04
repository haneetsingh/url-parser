import supertest from 'supertest'
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../utils/server';
import { createDocument } from '../service/parser.service';

const app = createServer();

const documentPayload = {
  title: 'Test',
  url: 'https://www.test.com/',
  files: [],
  links: [],
};

describe('route /api/parser', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get route', () => {

    describe('given a document exists', () => {
      it('should return a 200 status and the document', async () => {
        const document = await createDocument(documentPayload);
        const { body, statusCode } = await supertest(app).get(`/api/parser/${document._id}`);

        expect(statusCode).toBe(200);
        expect(body._id).toBe(document._id.toString());
      });
    });

    describe('given a document does not exist', () => {
      it('should return a 404 status', async () => {
        const documentId = new mongoose.Types.ObjectId().toString();
        const { statusCode } = await supertest(app).get(`/api/parser/${documentId}`);
        expect(statusCode).toBe(404)
      });
    });

    describe('given a documentId is not valid', () => {
      it('should return a 503 status', async () => {
        const documentId = 'abc123';
        const { statusCode } = await supertest(app).get(`/api/parser/${documentId}`);
        expect(statusCode).toBe(503)
      });
    });
  });

  describe('create route', () => {
    describe('given a create document request without url', () => {
      it('should return a 400 status and error', async () => {
        const createPayload = {};
        const { statusCode } = await supertest(app).post('/api/parser').send(createPayload);
        expect(statusCode).toBe(400);
      });
    });

    describe('given a create document request with invalid url', () => {
      it('should return a 400 status and error', async () => {
        const createPayload = { url: 'xyz.com'};
        const { statusCode, body } = await supertest(app).post('/api/parser').send(createPayload);
        expect(statusCode).toBe(400);
      });
    });

    // describe('given a document is created', () => {
    //   it('should return a 201 status and created document', async () => {
    //     const { statusCode, body } = await supertest(app).post('/api/parser').send(documentPayload);
    //     console.log('>>> body', body);
    //     console.log('>>> statusCode', statusCode);
    //     expect(true).toBe(true);
    //   });
    // });
  });
});