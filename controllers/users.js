import { request, response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //password hash
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();
  res.json({ user });
};
