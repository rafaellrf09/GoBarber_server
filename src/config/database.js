module.exports = {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
