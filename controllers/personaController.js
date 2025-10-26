const connection = require('../database/db');

exports.getAllPersonas = (req, res) => {
  connection.query('SELECT * FROM personas', (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
};
