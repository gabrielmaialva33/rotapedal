import 'dotenv/config';

export default {
  jwt: {
    secret: process.env.APP_SECRET || 'DEFAULT',
    expiresIn: '1d',
  },
};
