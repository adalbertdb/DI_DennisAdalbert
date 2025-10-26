const connection = require('../database/db');

exports.getAllRecursos = (req, res) => {
  connection.query('SELECT * FROM recursos', (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
};
