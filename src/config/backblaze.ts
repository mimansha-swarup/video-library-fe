import { S3Client } from '@aws-sdk/client-s3';
import { config } from './env';

export const s3Client = new S3Client({
  endpoint: config.backblaze.endpoint,
  region: 'us-west-000',
  credentials: {
    accessKeyId: config.backblaze.keyId,
    secretAccessKey: config.backblaze.applicationKey,
  },
});

export const bucketName = config.backblaze.bucketName;
