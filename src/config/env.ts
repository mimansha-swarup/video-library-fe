import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',

  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
  },

  backblaze: {
    keyId: process.env.B2_KEY_ID || '',
    applicationKey: process.env.B2_APPLICATION_KEY || '',
    bucketName: process.env.B2_BUCKET_NAME || '',
    bucketId: process.env.B2_BUCKET_ID || '',
    endpoint: process.env.B2_ENDPOINT || '',
  },

  signedUrlExpirySeconds: parseInt(process.env.SIGNED_URL_EXPIRY_SECONDS || '3600', 10),
};
