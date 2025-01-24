export class Cliente {
    constructor(
        nombre,
        primerApellido,
        carnetIdentidad,
        edad,
        sexo,
        municipio,
        numeroContacto,
        segundoNombre = "",
        segundoApellido = ""
      ) {
        this.nombre = nombre;
        this.segNombre = segundoNombre;
        this.primApellido = primerApellido;
        this.segApellido = segundoApellido;
        this.idCliente = carnetIdentidad;
        this.edad = edad;
        this.sexo = sexo;
        this.municipio = municipio;
        this.numCont = numeroContacto;
    }
   
    // Método para mostrar la información del cliente
    mostrarInfo() {
      console.log(`
        Nombre: ${this.nombre} ${this.segNombre}
        Apellidos: ${this.primApellido} ${this.segApellido}
        ID Cliente: ${this.idCliente}
        Edad: ${this.edad}
        Sexo: ${this.sexo}
        Municipio: ${this.municipio}
        Número de Contacto: ${this.numCont}
      `);
    }

    toJSON() {
        return {
          nombre: this.nombre,
          segNombre: this.segNombre,
          primApellido: this.primApellido,
          segApellido: this.segApellido,
          idCliente: this.idCliente,
          edad: this.edad,
          sexo: this.sexo,
          municipio: this.municipio,
          numCont: this.numCont,
        };
      }
  }