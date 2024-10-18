import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FormaPagoService } from './forma-pago.service';
import { FormaPagoDto } from '../contract/dto/formaPago.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('api/formaPago')
export class FormaPagoController {
    constructor (private formaPagoService : FormaPagoService){}

    @ApiOperation({summary: "Devuelve todas las formas de pago en la aplicación"})
    @Get()
    async getAllFormaPago(){
        return await this.formaPagoService.getAllFormaPago();
    }

    @ApiOperation({summary: "Permite crear nuevas formas de pagos"})
    @Post()
    createFormaPago(@Body() form : FormaPagoDto){
        this.formaPagoService.createFormaPago(form);
    }

    @ApiParam({name: "id", description: "Identificador de la forma de pago", example: 1, type: Number})
    @ApiOperation({summary: "Elimina una forma de pago"})
    @Delete("/:id")
    deleteFormaPago(@Param('id') id : string){
        this.formaPagoService.deleteFormaPago(id);
    }

    @ApiParam({name:'id', description:"Identificador de la forma de pago", example: 1})
    @ApiOperation({summary: "Modifica una forma de pago según su id"})
    @Patch('/:id')
    updateFormaPago(@Body() body : FormaPagoDto, @Param('id') id : string){
        this.formaPagoService.updateFormaPago(body, id);
    }
}
