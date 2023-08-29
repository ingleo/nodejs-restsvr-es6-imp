import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { request, response } from 'express';

import { fileUpload } from '../helpers/file-upload.js';
import { User, Product } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req = request, res = response) => {
  try {
    const name = await fileUpload(req.files, undefined, 'gallery');
    res.json({ name });
  } catch (error) {
    res.status(400).json({
      msg: error,
    });
  }
};

export const updateImg = async (req = request, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with id ${id}`,
        });
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no product with id ${id}`,
        });
      }
      break;
    default:
      return res.status(400).json({ msg: `Invalid collection` });
  }

  if (model.img) {
    const imgPath = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }

  const fileName = await fileUpload(req.files, undefined, collection);
  model.img = fileName;

  await model.save();
  res.json(model);
};
