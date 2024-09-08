import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { UserClientDto } from './dto/userClient.dto';
import { UserWorkerDto } from './dto/userWorker.dto';
import { ErrorHandler } from '../libs/errorHandler';

@Injectable()
export class UserService {
    constructor(@Inject(PG_CONNECTION) private conn : any){}

    async getUser(){
        const res = await this.conn.query('SELECT * FROM usuario');
        return res.rows;
    }
    async createUserClient(userClient : UserClientDto){
        try{
            await this.conn.query(`INSERT INTO usuario (nombre_usuario, contrasenia, email, tipo_usuario ,id_cliente) VALUES ('${userClient.user_name}', '${userClient.password}', '${userClient.email}', 2 ,'${userClient.id}')`)
        }
        catch(error){
           //throw new ErrorHandler(error).returnError(); 
           console.log(error);
        }
    }

    async createUserWorker(userWorker : UserWorkerDto){
        try{
            await this.conn.query(`INSERT INTO usuario (nombre_usuario, contrasenia, tipo_usuario) VALUES ('${userWorker.user_name}', '${userWorker.password}', 3)`);
        }
        catch(error){
            throw new ErrorHandler(error).returnError(); 
        }
    }

    async deleteUser(userName : string){
        await this.conn.query(`DELETE FROM usuario WHERE nombre_usuario = '${userName}'`);
    }

    async validationUser(userName : string, email : string, contrasenia : string){
        const res = await this.conn.query(`SELECT * FROM usuario_view WHERE (nombre_usuario = '${userName}' OR email = '${email}') AND contrasenia = '${contrasenia}';`)
        return res.rows;
    }

}
