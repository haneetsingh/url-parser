import dotenv from 'dotenv';
import createServer from './utils/server';
import connect from './utils/connect';

dotenv.config();
const port: string = process.env.PORT!;
const app = createServer();

app.listen(port, async () => {
  console.log(`Server running on port http://localhost:${port}`);
  await connect();
});