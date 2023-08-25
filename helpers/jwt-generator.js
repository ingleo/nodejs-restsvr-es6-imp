import jwt from 'jsonwebtoken';

const getJwt = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '1hr' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('The token could not be generated');
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { getJwt };
