import dotenv from 'dotenv';

// Load variables from .env file into environment variables
dotenv.config({ path: '.env' });

export default {
  android: {
    package: 'org.bitsofgood.umifeeds'
  }
};
