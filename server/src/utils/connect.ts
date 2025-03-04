import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';

async function connect() {
  dotenv.config();
  const dbUri: string = process.env.MONGODB_URL!;
  const options = { useNewUrlParser: true };

  try {
    await mongoose.connect(dbUri, options as ConnectOptions);
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Could not connect to database');
    process.exit(1);
  }
}

export default connect;