export class Contract {
    constructor(
      idCliente,
      matricula,
      beginDate,
      endDate,
      firmaDate,
      formaPago,
      seguro = false,
      diasProrroga
    ) {
      this.idCliente = idCliente;
      this.matricula = matricula;
      this.beginDate = beginDate;
      this.endDate = endDate;
      this.firmaDate = firmaDate;
      this.formaPago = formaPago;
      this.seguro = seguro;
      this.diasProrroga = diasProrroga;
    }
  
    // Método para mostrar la información del contrato
    mostrarInfo() {
      console.log(`
        ID Cliente: ${this.idCliente}
        Matrícula: ${this.matricula}
        Fecha de Inicio: ${this.beginDate}
        Fecha de Fin: ${this.endDate}
        Fecha de Firma: ${this.firmaDate}
        Forma de Pago: ${this.formaPago}
        Seguro: ${this.seguro}
        Días de Prórroga: ${this.diasProrroga}
      `);
    }

    toJSON() {
        return {
          idCliente: this.idCliente,
          matricula: this.matricula,
          beginDate: this.beginDate,
          endDate: this.endDate,
          firmaDate: this.firmaDate,
          formaPago: this.formaPago,
          seguro: this.seguro,
          diasProrroga: this.diasProrroga,
        };
      }
  }
  