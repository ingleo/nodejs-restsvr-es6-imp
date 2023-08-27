import { request, response } from 'express';
import { Category } from '../models/index.js';

export const getCategories = async (req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', 'name')
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    categories,
  });
};

export const getCategoryById = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'name');

  res.json(category);
};

export const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `The category ${categoryDB.name} already exist`,
    });
  }

  const data = {
    name,
    user: req.authenticatedUser.id,
  };

  const category = new Category(data);
  await category.save();
  res.status(201).json(category);
};

export const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.authenticatedUser._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true });

  res.json(category);
};

export const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(category);
};
