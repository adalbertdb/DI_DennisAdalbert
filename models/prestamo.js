class Prestamo {
  constructor(prestamos_id, persona_id, recurso_id, fecha_prestamo, fecha_devolucion, estado) {
    this.prestamos_id = prestamos_id;
    this.persona_id = persona_id;
    this.recurso_id = recurso_id;
    this.fecha_prestamo = fecha_prestamo;
    this.fecha_devolucion = fecha_devolucion;
    this.estado = estado;
  }
}

module.exports = Prestamo;
