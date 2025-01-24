export class Moto {
    constructor(
        matricula,
        cantKm,
        color,
        model,
        marc,
        situation,
        idMoto
    ){
        this.matricula = matricula;
        this.cantKm = cantKm;
        this.color = color;
        this.model = model;
        this.marc = marc;
        this.situation = situation,
        this.idMoto = idMoto
    }

    toJSON() {
        return {
          matricula: this.matricula,
          cantkm: this.cantKm,
          color: this.color,
          modelo: this.model,
          marca: this.marc,
          situacion: this.situation,
          idMoto: this.idMoto,
        };
      }
}