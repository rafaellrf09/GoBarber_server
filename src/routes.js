import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  try {
    const user = await User.create({
      name: 'Rafael Lima',
      email: 'rafaellrf@gmail.com',
      password_hash: 'asdgfdshgfsdhgd',
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
});

export default routes;
