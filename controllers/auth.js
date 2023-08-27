import { request, response } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/index.js';
import { getJwt, googleVerify } from '../helpers/index.js';

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

    res.cookie('cafe-app-cookie', token, {
      httpOnly: true,
    });

    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'An error has ocurred',
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { email, name, img } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        email,
        name,
        password: 'NA',
        img,
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'The user is not authorized to login',
      });
    }

    const token = await getJwt(user.id);

    res.json({
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      msg: 'The token could not be verified',
    });
  }
};

export { login, googleSignIn };
