import { User, Role, Category, Product, Gift} from '../models/index.js';

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ name: role });
  if (!roleExists) {
    throw new Error(`The role ${role} is not allowed`);
  }

  if (role === 'ADMIN_ROLE') {
    const adminRoleExists = await User.findOne({ role });
    if (adminRoleExists) {
      throw new Error(`Can not create admin user`);
    }
  }
};

const emailExists = async (email) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`The email ${email} is already registered`);
  }
};

const userIdExists = async (id) => {
  const userId = await User.findById(id);
  if (!userId) {
    throw new Error(`User with id ${id} does not exist`);
  }
};

const categoryIdExists = async (id) => {
  const categoryId = await Category.findById(id);
  if (!categoryId) {
    throw new Error(`Category with id ${id} does no exist`);
  }
};

const productIdExists = async (id) => {
  const productId = await Product.findById(id);
  if (!productId) {
    throw new Error(`Product with id ${id} does not exist`);
  }
};

const giftIdExists = async (id) => {
  const giftDb = await Gift.findById(id);
  if (!giftDb) {
    throw new Error(`Gift with id ${id} does not exist`);
  }
};

const isValidCollection = (collectionName = '', collections = []) => {
  const valid = collections.includes(collectionName);
  if (!valid) {
    throw new Error(`Collection ${collectionName} is not allowed`);
  }

  return true;
};

export {
  emailExists,
  isValidRole,
  userIdExists,
  categoryIdExists,
  productIdExists,
  giftIdExists,
  isValidCollection,
};
