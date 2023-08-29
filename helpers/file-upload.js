import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const defaultValidExt = ['png', 'jpg', 'jpeg', 'gif'];

const fileUpload = (files, validExtensions = defaultValidExt, folder = '') => {
  return new Promise((resolve, reject) => {
    const { filekey } = files;
    const splitName = filekey.name.split('.');
    const extension = splitName[splitName.length - 1];

    if (!validExtensions.includes(extension)) {
      return reject(`File extension ${extension} is not allowed`);
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const tempFileName = uuidv4() + '.' + extension;

    const uploadPath = path.join(
      __dirname,
      '../uploads/',
      folder,
      tempFileName
    );

    filekey.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(tempFileName);
    });
  });
};

export { fileUpload };
