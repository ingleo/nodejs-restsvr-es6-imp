import { Product } from '../models/index.js';

export const getProducts = async (req, res) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(from))
      .limit(Number(limit)),
  ]);

  res.json({
    total,
    products,
  });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

  res.json(product);
};

export const createProduct = async (req = request, res = response) => {
  const { name, description, unitPrice, category } = req.body;
  const nameUpper = name.toUpperCase();
  const productDb = await Product.findOne({ name: nameUpper });

  if (productDb) {
    return res.status(400).json({
      msg: `Product ${productDb.name} already exist`,
    });
  }

  const data = {
    name: nameUpper,
    description,
    unitPrice,
    category,
    user: req.authenticatedUser.id,
  };

  const product = new Product(data);
  await product.save();
  res.status(201).json(product);
};

export const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.authenticatedUser._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

export const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  res.json(product);
};
