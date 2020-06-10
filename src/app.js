import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(bodyParser.json());
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
