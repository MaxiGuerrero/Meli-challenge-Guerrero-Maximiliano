import winston from 'winston';

/**
 * Generate an object of logger Winston
 */
export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, message }) => `${timestamp} ${JSON.stringify(message)}`)
      ),
    }),
  ],
});
