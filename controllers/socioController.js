const connection = require('../database/db');

exports.getAllSocios = (req, res) => {
  connection.query('SELECT * FROM soci', (error, results) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).json(results);
    }
  });
};
