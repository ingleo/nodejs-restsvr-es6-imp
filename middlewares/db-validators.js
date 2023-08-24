import { User } from '../models/index.js';

const emailExists = async (email) => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`The email ${email} is already registered`);
  }
};

export { emailExists };
