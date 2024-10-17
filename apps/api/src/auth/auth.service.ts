import { HttpCode, HttpException, Inject, Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import { SignObjectDto } from './dto/signObject.dto';
import { hash, compare } from 'bcrypt';
import { PG_CONNECTION } from 'src/constants';
import { LoginObjectDto } from './dto/loginObject.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class AuthService {
    constructor (private jwtService: JwtService, @Inject(PG_CONNECTION)private conn : any ){}

    async register(userObject:SignObjectDto){
        const {password} = userObject;

        const plainToCrypto = await hash(password, 10);
        userObject = {...userObject, password:plainToCrypto};
        
        //return this.conn.query('')
    }

    async login(userObject:LoginObjectDto){
        const findUser = this.conn.query(`SELECT * FROM user WHERE username = '${userObject.name}'`);

        if(!findUser)
            throw new HttpException("USER_NOT_FOUND", 402);

       const isCheked = compare(userObject.password, findUser.password);
       if(!isCheked)
            throw new HttpException("PASSWORD_INCORRECT", 401);
       
       const payload = {id:findUser.id, name:findUser.name};
       const token = this.jwtService.sign(payload);
       const data = {
        user:findUser,
        token,
       }

       return data;
    }

    async generateToken(user: any) {
        const payload = {sub: user.username,username:user.username, iat: Date.now(), exp: (Date.now()/1000) + (60*60*24)};

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
