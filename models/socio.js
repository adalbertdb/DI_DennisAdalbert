const Persona = require('./persona');

class Socio extends Persona {
  constructor(persona_id, DNI, nombre, apellido) {
    super(persona_id, DNI, nombre, apellido);
    this.soci_id = persona_id;
  }
}

module.exports = Socio;
