import { request, response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/index.js';
import { getJwt } from '../helpers/index.js';

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'The user or password is incorrect',
      });
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'The user is not authorized to login',
      });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: 'Wrong user or password',
      });
    }

    const token = await getJwt(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'An error has ocurred',
    });
  }
};

export { login };
