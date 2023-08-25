import { request, response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/index.js';

const validateJwt = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'User not authorized',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'User does not exist',
      });
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'Invalid token',
      });
    }

    req.authenticatedUser = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

export { validateJwt };
