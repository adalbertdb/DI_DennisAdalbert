const Recurso = require('./recurso');

class Libro extends Recurso {
  constructor(recurso_id, titulo, f_lanzamiento, n_ejemplares, tipo, autor, ISBN, paginas) {
    super(recurso_id, titulo, f_lanzamiento, n_ejemplares, tipo);
    this.autor = autor;
    this.ISBN = ISBN;
    this.paginas = paginas;
  }
}

module.exports = Libro;
