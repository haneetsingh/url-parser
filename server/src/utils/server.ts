import express, { Express, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser = require('body-parser');
import routes from '../routes';
import errorHandler from '../middleware/error.middleware';

function createServer() {
  const app: Express = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(path.resolve('./'), 'public/index.html'));
  });

  routes(app);
  app.use(errorHandler);

  return app;
}

export default createServer;