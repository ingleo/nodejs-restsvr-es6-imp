import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import { request, response } from 'express';
import { v2 as cloudinary } from 'cloudinary';

import { fileUpload } from '../helpers/file-upload.js';
import { User, Product } from '../models/index.js';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

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

  try {
    const fileName = await fileUpload(req.files, undefined, collection);
    model.img = fileName;

    await model.save();
    res.json(model);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

export const getImg = async (req = request, res = response) => {
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
      return res.sendFile(imgPath);
    }
  }

  const noImagePath = path.join(__dirname, '../assets', 'no-image.jpg');
  res.sendFile(noImagePath);
};

export const updateCloudinaryImg = async (req = request, res = response) => {
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
    const fileNamePath = model.img.split('/');
    const fileName = fileNamePath[fileNamePath.length - 1];
    const [public_id] = fileName.split('.');
    try {
      await cloudinary.uploader.destroy(public_id);
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  }

  const { tempFilePath } = req.files.filekey;
  try {
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
      folder: collection,
    });
    model.img = secure_url;
    await model.save();

    res.json(model);
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

export const getCloudinaryImg = async (req = request, res = response) => {
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
    return res.redirect(model.img);
  }

  const noImagePath = path.join(__dirname, '../assets', 'no-image.jpg');
  res.sendFile(noImagePath);
};
