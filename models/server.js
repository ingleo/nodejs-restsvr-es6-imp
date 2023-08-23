import express from 'express';
import cors from 'cors';

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //paths
    this.paths = {
      users: '/api/auth/v1',
    };

    //middlewares
    this.getMiddlewares();
  }

  getMiddlewares() {
    //cors
    this.app.use(cors());

    //body parser
    this.app.use(express.json());

    //public dir
    this.app.use(express.static('public'));
  }

  listen() {
    this.app.listen(process.env.PORT || 3000, () => {
      console.log('Server running on port ', this.port);
    });
  }
}
