import { request, response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/index.js';

export const getUsers = async (req = request, res = response) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

export const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //password hash
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();
  res.json({ user });
};

export const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...payload } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    payload.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, payload);

  res.json({
    user,
  });
};

export const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  //physical remove
  //const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  //const authenticatedUser = req.authenticatedUser;

  res.json({
    user,
  });
};
