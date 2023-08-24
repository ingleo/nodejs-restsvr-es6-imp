import { User, Role } from '../models/index.js';

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
    if(!userId) {
        throw new Error(`The user id ${id} does not exist`)
    }
}

export { emailExists, isValidRole, userIdExists };
