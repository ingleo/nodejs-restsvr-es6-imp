import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { dbConnection } from '../database/config.js';
import {
  authRouter,
  usersRouter,
  categoriesRouter,
  productsRouter,
  searchRouter,
} from '../routes/index.js';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //paths
    this.paths = {
      auth: '/cafe-api/v1/auth',
      users: '/cafe-api/v1/users',
      categories: '/cafe-api/v1/categories',
      products: '/cafe-api/v1/products',
      search: '/cafe-api/v1/search',
    };

    //bd connection
    this.connectDB();

    //middlewares
    this.getMiddlewares();

    //routes
    this.getRoutes();
  }

  async connectDB() {
    await dbConnection();
  }

  getMiddlewares() {
    //cors
    this.app.use(cors());

    //body parser
    this.app.use(express.json());

    //cookie parser
    this.app.use(cookieParser());

    //public dir
    this.app.use(express.static('public'));
  }

  getRoutes() {
    this.app.use(this.paths.auth, authRouter);
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.categories, categoriesRouter);
    this.app.use(this.paths.products, productsRouter);
    this.app.use(this.paths.search, searchRouter);
  }

  listen() {
    this.app.listen(process.env.PORT || 3001, () => {
      console.log('Server running on port ', this.port);
    });
  }
}
