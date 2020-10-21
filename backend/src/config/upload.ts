import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    disk: {};
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname
          .toString()
          .trim()
          .replace(' ', '_')}`;
        return callback(null, filename);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: 'app-rotapedal-bucket2',
    },
  },
} as IUploadConfig;
