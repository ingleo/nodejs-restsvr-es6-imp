import { request, response } from 'express';

const isAdminRole = (req = request, res = response, next) => {
  if (!req.authenticatedUser) {
    return res.status(401).json({
      msg: 'User does not have a verified token',
    });
  }

  const { role, name } = req.authenticatedUser;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `The user ${name} is not an admin`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.authenticatedUser) {
      return res.status(401).json({
        msg: 'User does not have a verified token',
      });
    }

    if (!roles.includes(req.authenticatedUser.role)) {
      return res.status(401).json({
        msg: `The user must be one of these roles: ${roles}`,
      });
    }
    next();
  };
};

export { isAdminRole, hasRole };
