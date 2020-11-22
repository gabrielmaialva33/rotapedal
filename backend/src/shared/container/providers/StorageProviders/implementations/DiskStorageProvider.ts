import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    if (file === 'default.png') {
      await fs.promises.copyFile(
        path.resolve(uploadConfig.tmpFolder, file),
        path.resolve(uploadConfig.uploadsFolder, file),
      );
    } else {
      await fs.promises.rename(
        path.resolve(uploadConfig.tmpFolder, file),
        path.resolve(uploadConfig.uploadsFolder, file),
      );
    }
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);
    try {
      await fs.promises.stat(filePath);
    } catch (err) {
      return;
    }
    if (file === 'default.png') {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
