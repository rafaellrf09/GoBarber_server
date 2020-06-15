import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.app = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(bodyParser.json());
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.app.use(routes);
    this.app.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, nex) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      res.status(500).json({ error: 'Internal server error.' });
    });
  }
}

export default new App().app;
