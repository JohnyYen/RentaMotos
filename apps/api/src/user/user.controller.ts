import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserClientDto } from './dto/userClient.dto';
import { UserWorkerDto } from './dto/userWorker.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService : UserService){}


    @ApiOperation({summary: "Devuelve todos los usuarios"})
    @Get()
    async getUser(){
        return await this.userService.getUser();
    }
    
    @ApiBody({type:UserClientDto, description: "Los datos de un usuario tipo cliente"})
    @ApiOperation({summary: "Crea un nuevo usuario cliente"})
    @Post('/client')
    createUserClient(@Body() body : UserClientDto){
        this.userService.createUserClient(body);
    }


    
    // @Post('/validate')
    // async validateCreateUser(@Body() body){
    //     const result = await this.userService.validateUserName(body.info);
    //     if(result)
    //         return this.authService.generateToken(body.info);
    //     else
    //         return null;
    // }

    @Get('/worker')
    async getWorkers(){
        return this.userService.getWorkers();
    }
    
    @ApiBody({type:UserWorkerDto, description: "Los datos de un usuario tipo trabajador"})
    @ApiOperation({summary: "Crea un nuevo trabajador"})
    @Post('/worker')
    createUserWorker(@Body() body : UserWorkerDto){
        this.userService.createUserWorker(body);
    }

    
    // @Post()
    // async validateUser(@Body('userName') userName : string, @Body('password') password : string){
    //     const result = await this.userService.validationUser(userName, password);
    //     if (result)
    //         return this.authService.generateToken({username:userName});
    //     else return null;
    // }

    @ApiParam({name:"userName", description:"Nombre de Usuario"})
    @ApiOperation({summary: "Elimina Usuarios"})
    @Delete('/:userName')
    async deleteUser(@Param("userName") userName : string){
        this.userService.deleteUser(userName);
    }
}
