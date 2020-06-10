import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import dataBaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);
    console.log('Banco de dados postgres conectado;');

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    console.log('Banco de dados Mongo conectado;');
  }
}

export default new Database();
