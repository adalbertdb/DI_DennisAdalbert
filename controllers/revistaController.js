const connection = require('../database/db');

exports.getAllRevistas = (req, res) => {
  connection.query('SELECT * FROM revistas', (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
};
