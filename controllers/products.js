import { Product } from '../models/index.js';

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
