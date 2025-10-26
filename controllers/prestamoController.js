const connection = require('../database/db');

exports.getAllPrestamos = (req, res) => {
  connection.query('SELECT * FROM prestamos', (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
};
