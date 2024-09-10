import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';

@Controller('api/client')
export class ClientController {

    constructor (private clientService : ClientService){}
    
    @Get()
    async getClients() {
        return await this.clientService.getAllClients();
    }

    @Get('/mun/:mun')
    async getClientesByMun(@Param('mun') mun:string){
        return await this.clientService.getClientByMun(mun);
    }

    @Get('/pdf')
    async getClientsByPDF(@Res() res) {
        const buffer = await this.clientService.getAllClientByPDF();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Clients.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }

    @Get("/bad")
    async getBadClients() {
        return await this.clientService.getAllBadClients();
    }
    
    @Get('/sample/:id')
    async getClient(@Param('id') id : string){
        return await this.clientService.getClient(id);
    }
    @Get('/bad/pdf')
    async getBadClientsByPDF(@Res() res) {
        const buffer = await this.clientService.getPDFBadClients();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=BadClients.pdf');
        res.setHeader('Content-Length', buffer.length);
 
        res.send(buffer);
    }
    
    @Post()
    createClient(@Body() clientDto : ClientDto){
        console.log(clientDto);
        this.clientService.createClient(clientDto);
    }

    @Delete('/:id')
    deleteClient(@Param("id") id : string){
        this.clientService.deleteClient(id);
    }

    @Patch('/:id')
    updateClient(@Param('id') id : string, @Body() client : ClientDto){
        this.clientService.updateClient(client, id);
    }
}
