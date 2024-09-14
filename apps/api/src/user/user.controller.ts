import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserClientDto } from './dto/userClient.dto';
import { UserWorkerDto } from './dto/userWorker.dto';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get()
    async getUser(){
        return await this.userService.getUser();
    }
    @Post('/client')
    createUserClient(@Body() body : UserClientDto){
        this.userService.createUserClient(body);
    }

    @Post('/validate')
    async validateCreateUser(@Body() body){
        return await this.userService.validateUserName(body.info);
    }

    @Get('/worker')
    async getWorkers(){
        return this.userService.getWorkers();
    }
    
    @Post('/worker')
    createUserWorker(@Body() body : UserWorkerDto){
        this.userService.createUserWorker(body);
    }

    @Post()
    async validateUser(@Body('userName') userName : string, @Body('password') password : string){
        return await this.userService.validationUser(userName, password);
        //console.log(await this.userService.validationUser(userName, email, password));
    }

    @Delete('/:userName')
    async deleteUser(@Param('userName') userName : string){
        this.userService.deleteUser(userName);
    }
}
