const Recurso = require('./recurso');

class Revista extends Recurso {
  constructor(recurso_id, titulo, f_lanzamiento, n_ejemplares, tipo) {
    super(recurso_id, titulo, f_lanzamiento, n_ejemplares, tipo);
  }
}

module.exports = Revista;
