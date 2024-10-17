import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('api/client')
export class ClientController {

    constructor (private clientService : ClientService){}
    
    @ApiOperation({summary: "Devuelve todos los clientes"})
    @Get()
    async getClients() {
        return await this.clientService.getAllClients();
    }

    @ApiOperation({summary: "Devuelve todos los clientes según su municipio"})
    @Get('/mun/:mun')
    async getClientesByMun(@Param('mun') mun:string){
        return await this.clientService.getClientByMun(mun);
    }

    @ApiOperation({summary: "Devuelve todos los clientes en formato pdf"})
    @Get('/pdf')
    async getClientsByPDF(@Res() res) {
        const buffer = await this.clientService.getAllClientByPDF();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Clients.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @ApiOperation({summary: "Devuelve todos los clientes incumplidores"})
    @Get("/bad")
    async getBadClients() {
        return await this.clientService.getAllBadClients();
    }
    
    @ApiOperation({summary: "Devuelve a un cliente según su identificador"})
    @Get('/sample/:id')
    async getClient(@Param('id') id : string){
        return await this.clientService.getClient(id);
    }

    @ApiOperation({summary: "Devuelve el listado de los clientes incumplidores en formato pdf"})
    @Get('/bad/pdf')
    async getBadClientsByPDF(@Res() res) {
        const buffer = await this.clientService.getPDFBadClients();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=BadClients.pdf');
        res.setHeader('Content-Length', buffer.length);
        
        res.send(buffer);
    }

    @ApiOperation({summary: "Devuelve a todos los clientes que pertenecen a un municipio en formato pdf"})
    @Get('/worker/pdf/:mun')
    async getPDF(@Param('mun') mun:string, @Res() res){
        const buffer = await this.clientService.getAllClientPDFWorkerMun(mun);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=ClientsWorker.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);   
    }
    
    @ApiOperation({summary: "Crea un nuevo cliente"})
    @Post()
    createClient(@Body() clientDto : ClientDto){
        this.clientService.createClient(clientDto);
    }

    @ApiOperation({summary: "Elimina un cliente según su identificador"})
    @Delete('/:id')
    deleteClient(@Param("id") id : string){
        this.clientService.deleteClient(id);
    }

    @ApiBody({type:ClientDto, description: "Es el dto de Cliente"})
    @ApiParam({name: "id", description: "El carnet de identidad del cliente"})
    @ApiOperation({summary: "Modifica un cliente según su identificador"})
    @Patch('/:id')
    updateClient(@Param('id') id : string, @Body() client : ClientDto){
        this.clientService.updateClient(client, id);
    }

    @ApiOperation({summary: "Valida que el telefono no se repita"})
    @Post('/validate/phone')
    async validateNumber(@Body() body){
        return this.clientService.validatePhoneNumber(body.phoneNumber);
    }
}
