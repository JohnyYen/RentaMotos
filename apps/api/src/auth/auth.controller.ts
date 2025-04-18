import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginObjectDto } from './dto/loginObject.dto';
import { SignObjectDto } from './dto/signObject.dto';
import { ClientSignDto } from './dto/clientSign.dto';
import { SkipAuth } from './public.decorator';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @SkipAuth()
    @ApiOperation({summary: "Loguear al usuario"})
    @ApiBody({type:LoginObjectDto, description: 'Revisar la documentación del Login Dto'})
    @Post('/login')
    login(@Body() authObject: LoginObjectDto){
       return this.authService.login(authObject);
    }

    @SkipAuth()
    @ApiOperation({summary: "Registrar un nuevo usuario"})
    @ApiBody({type:SignObjectDto, description: "Revisar la documentación del Sign Dto"})
    @Post("/register")
    register(@Body() authObject:ClientSignDto){
        return this.authService.register(authObject);
    }
}
