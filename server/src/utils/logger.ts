import logger from 'pino';
import dayjs from 'dayjs';

export default logger({
  transport: {
    target: 'pino-pretty'
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
