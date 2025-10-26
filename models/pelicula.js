const Recurso = require('./recurso');

class Pelicula extends Recurso {
  constructor(recurso_id, titulo, f_lanzamiento, n_ejemplares, tipo, director, duracion) {
    super(recurso_id, titulo, f_lanzamiento, n_ejemplares, tipo);
    this.director = director;
    this.duracion = duracion;
  }
}

module.exports = Pelicula;
