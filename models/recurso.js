class Recurso {
  constructor(recurso_id, titulo, f_lanzamiento, n_ejemplares, tipo) {
    this.recurso_id = recurso_id;
    this.titulo = titulo;
    this.f_lanzamiento = f_lanzamiento;
    this.n_ejemplares = n_ejemplares;
    this.tipo = tipo;
  }
}

module.exports = Recurso;
