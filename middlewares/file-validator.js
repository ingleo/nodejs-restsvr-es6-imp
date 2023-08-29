import { request, response } from 'express';

const fileValidator = (req = request, res = response, next) => {
  if (!req.files || !req.files.filekey || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: 'There is no file to upload',
    });
  }

  next();
};

export { fileValidator };
