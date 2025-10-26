const Persona = require('./persona');

class Administrador extends Persona {
  constructor(persona_id, DNI, nombre, apellido, rol) {
    super(persona_id, DNI, nombre, apellido);
    this.rol = rol;
  }
}

module.exports = Administrador;
