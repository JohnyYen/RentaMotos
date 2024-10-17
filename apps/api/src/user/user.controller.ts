import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserClientDto } from './dto/userClient.dto';
import { UserWorkerDto } from './dto/userWorker.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';

@Controller('api/user')
export class UserController {
    constructor(private readonly authService: AuthService,private readonly userService : UserService){}

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
        const result = await this.userService.validateUserName(body.info);
        if(result)
            return this.authService.generateToken(body.info);
        else
            return null;
    }

    @UseGuards(JwtAuthGuard)
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
        const result = await this.userService.validationUser(userName, password);
        if (result)
            return this.authService.generateToken({username:userName});
        else return null;
    }

    @Delete('/:userName')
    async deleteUser(@Param("userName") userName : string){
        this.userService.deleteUser(userName);
    }
}
