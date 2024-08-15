import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FormaPagoService } from './forma-pago.service';
import { FormaPagoDto } from './dto/formaPago.dto';

@Controller('forma-pago')
export class FormaPagoController {
    constructor (private formaPagoService : FormaPagoService){}

    @Get()
    async getAllFormaPago(){
        return await this.formaPagoService.getAllFormaPago();
    }

    @Post()
    createFormaPago(@Body() form : FormaPagoDto){
        this.formaPagoService.createFormaPago(form);
    }

    @Delete("/form")
    deleteFormaPago(@Param('form') form : string){
        this.formaPagoService.deleteFormaPago(form);
    }

    @Patch('/id')
    updateFormaPago(@Body() body : FormaPagoDto, @Param('id') id : string){
        this.formaPagoService.updateFormaPago(body, id);
    }
}
