import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(bodyParser.json());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
