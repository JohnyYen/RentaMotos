import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginObjectDto } from './dto/loginObject.dto';
import { SignObjectDto } from './dto/signObject.dto';

@ApiTags('Autorización')
@Controller('auth')
export class AuthController {
    constructor(private jwtService: AuthService){}

    @Post('login')
    login(@Body() authObject: LoginObjectDto){

    }

    @Post("register")
    register(@Body() authObject:SignObjectDto){
        
    }
}
