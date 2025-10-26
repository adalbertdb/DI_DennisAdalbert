const connection = require('../database/db');

exports.getAllPeliculas = (req, res) => {
  connection.query('SELECT * FROM peliculas', (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
};
