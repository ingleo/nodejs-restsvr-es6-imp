import { User, Role, Category } from '../models/index.js';

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ name: role });
  if (!roleExists) {
    throw new Error(`The role ${role} is not allowed`);
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
    throw new Error(`The user with id ${id} does not exist`);
  }
};

const categoryIdExists = async (id) => {
  const categoryId = await Category.findById(id);
  if (!categoryId) {
    throw new Error(`The category with id ${id} does no exist`);
  }
};

export { emailExists, isValidRole, userIdExists, categoryIdExists };
