import { Express } from 'express';
import {
  getDocumentHandler,
  createDocumentHandler,
  getAllDocumentsHandler,
} from './controller/parser.controller';
import validateResource from './middleware/validateResource';
import { createDocumentSchema } from './schema/parser.schema';

function routes(app: Express) {
  app.get('/api/parser', getAllDocumentsHandler);
  app.get('/api/parser/:id', getDocumentHandler);
  app.post('/api/parser', validateResource(createDocumentSchema), createDocumentHandler);
}

export default routes;
