import { HttpException, Inject, Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import { SignObjectDto } from './dto/signObject.dto';
import { hash, compare } from 'bcrypt';
import { PG_CONNECTION } from 'src/constants';
import { LoginObjectDto } from './dto/loginObject.dto';
import { ClientSignDto } from './dto/clientSign.dto';

@Injectable()
export class AuthService {
    constructor (private jwtService: JwtService, @Inject(PG_CONNECTION) private conn : any ){}

    async register(userObject:ClientSignDto){
        const {password, email, user_name, ci} = userObject;

        const plainToCrypto = await hash(password, 10);
        userObject = {...userObject, password:plainToCrypto};
        
        const response = await this.conn.query(`INSERT INTO usuario(nombre_usuario, contrasenia, email, tipo_usuario, id_cliente) VALUES ('${user_name}', '${password}', '${email}', 2, '${ci}')`);
        console.log(userObject)
        const createUser = await this.conn.query(`SELECT * FROM usuario WHERE nombre_usuario = '${user_name}'`);

        const user = createUser[0];
        console.log(user);
        const payload = {
            name:user_name,
            roles: 2,
        };

        const token = this.jwtService.sign(payload);

        const data = {
         user:user,
         token,
        }
        console.log(data);
        return data;
    }

    async login(userObject:LoginObjectDto){
        const response = await this.conn.query(`SELECT * FROM usuario WHERE nombre_usuario = '${userObject.user_name}'`);
        const findUser = response.rows[0]; 
        if(!findUser)
            throw new HttpException("USER_NOT_FOUND", 402);
        
       const isCheked = compare(userObject.password, findUser.contrasenia);
       if(!isCheked)
            throw new HttpException("PASSWORD_INCORRECT", 401);
       
       const payload = {
            id:findUser.id_user,
            name:findUser.nombre_usuario,
            roles: findUser.tipo_usuario,
        };

       const token = this.jwtService.sign(payload);

       const data = {
        user:findUser,
        token,
       }

       return data;
    }
}
