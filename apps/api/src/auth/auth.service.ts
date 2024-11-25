import { HttpException, Inject, Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import { SignObjectDto } from './dto/signObject.dto';
import { hash, compare } from 'bcrypt';
import { PG_CONNECTION } from 'src/constants';
import { LoginObjectDto } from './dto/loginObject.dto';
import { ClientSignDto } from './dto/clientSign.dto';

@Injectable()
export class AuthService {
    constructor (private jwtService: JwtService, @Inject(PG_CONNECTION)private conn : any ){}

    async register(userObject:ClientSignDto){
        const {password, email, user_name, ci} = userObject;

        const plainToCrypto = await hash(password, 10);
        userObject = {...userObject, password:plainToCrypto};
        
        return await this.conn.query(`INSERT INTO USER VALUES ('${user_name}', '${password}', '${email}', '${ci}', 2)`);
    }

    async login(userObject:LoginObjectDto){
        const response = await this.conn.query(`SELECT * FROM usuario WHERE nombre_usuario = '${userObject.user_name}'`);
        const findUser = response.rows[0]; 
        if(!findUser)
            throw new HttpException("USER_NOT_FOUND", 402);
        console.log(findUser);
       const isCheked = compare(userObject.password, findUser.contrasenia);
       if(!isCheked)
            throw new HttpException("PASSWORD_INCORRECT", 401);
       
       const payload = {id:findUser.id_user, name:findUser.nombre_usuario};
       const token = this.jwtService.sign(payload);
       const data = {
        user:findUser,
        token,
       }

       return data;
    }
}
