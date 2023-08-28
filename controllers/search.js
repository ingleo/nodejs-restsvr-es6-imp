import { isValidObjectId } from 'mongoose';
import { request, response } from 'express';

import { User, Category, Product } from '../models/index.js';

const allowedCollections = ['users', 'categories', 'products'];

const searchUsers = async (res = response, term = '') => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(term, 'i');

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }],
  });

  res.json({ results: users });
};

const searchCategories = async (res = response, term = '') => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({ results: category ? [category] : [] });
  }

  const regex = new RegExp(term, 'i');

  const categories = await Category.find({
    $and: [{ name: regex }, { status: true }],
  });

  res.json({
    results: categories,
  });
};

const searchProducts = async (res = response, term = '') => {
  const isMongoId = isValidObjectId(term);

  if (isMongoId) {
    const product = await Product.findById(term).populate('category', 'name');
    return res.json({ results: product ? [product] : [] });
  }

  const regex = new RegExp(term, 'i');

  const products = await Product.find({
    $or: [{ name: regex }, { description: regex }],
    $and: [{ status: true }],
  }).populate('category', 'name');

  res.json({
    results: products,
  });
};

export const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    res.status(400).json({
      msg: `Allowed collections are: ${allowedCollections}`,
    });
  }

  switch (collection) {
    case 'users':
      searchUsers(res, term);
      break;
    case 'categories':
      searchCategories(res, term);
      break;
    case 'products':
      searchProducts(res, term);
      break;
    default:
      res.status(500).json({ msg: 'Search not allowed' });
  }
};
