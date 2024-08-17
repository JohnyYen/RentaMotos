import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from './dto/client.dto';
import { ClientPatchDto } from './dto/clientPatch.dto';

@Controller('api/client')
export class ClientController {

    constructor (private clientService : ClientService){}
    
    @Get()
    async getClients() {
        return await this.clientService.getAllClients();
    }

    @Get("/bad")
    async getBadClients() {
        return await this.clientService.getAllBadClients();
    }

    @Get('/pdf')
    getClientsByPDF() {
        this.clientService.getAllClientByPDF();
    }

    @Post()
    createClient(@Body() clientDto : ClientDto){
        this.clientService.createClient(clientDto);
    }

    @Delete()
    deleteClient(@Body("id") id : string){
        this.clientService.deleteClient(id);
    }

    @Patch('/id')
    updateClient(@Param('id') id : string, @Body() client : ClientPatchDto){
        this.clientService.updateClient(client, id);
    }
}
