import { IsBoolean, IsDate, IsInt, IsString, Min, min } from "class-validator";

export class ContractDto {
  
    public idCliente : string;

  
    public matricula : string;

  
    public beginDate : string;

   
    public endDate : string;

  
    public firmaDate : string;

   
    public formaPago : string;

    public seguro : boolean;

   
    public diasProrroga : number;
}