import express from 'express';
import cors from 'cors';

import { dbConnection } from '../database/config.js';
import { usersRouter } from '../routes/users.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //paths
    this.paths = {
      users: '/api/v1/users',
    };

    //bd connection
    this.connectDB();

    //middlewares
    this.getMiddlewares();

    //routes
    this.getRoutes();
  }

  getMiddlewares() {
    //cors
    this.app.use(cors());

    //body parser
    this.app.use(express.json());

    //public dir
    this.app.use(express.static('public'));
  }

  async connectDB() {
    await dbConnection();
  }

  getRoutes() {
    this.app.use(this.paths.users, usersRouter);
  }

  listen() {
    this.app.listen(process.env.PORT || 3001, () => {
      console.log('Server running on port ', this.port);
    });
  }
}
