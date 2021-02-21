import dotenv from 'dotenv';

// Load variables from .env file into environment variables
dotenv.config({ path: '.env' });

export default {
  scheme: 'umifeeds',
  android: {
    package: 'org.bitsofgood.umifeeds'
  }
};
