const connection = require('../database/db');

exports.getAllAdministradores = (req, res) => {
  connection.query('SELECT * FROM administrador', (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
};
