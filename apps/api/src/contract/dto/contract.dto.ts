import { IsBoolean, IsDate, IsInt, IsString, Min, min } from "class-validator";

export class ContractDto {
  
    public idCliente : string;

  
    public matricula : string;

  
    public beginDate : Date;

   
    public endDate : Date;

  
    public firmaDate : Date;

   
    public formaPago : string;

    public seguro : boolean;

   
    public diasProrroga : number;
}