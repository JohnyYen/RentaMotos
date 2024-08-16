import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { UserClientDto } from './dto/userClient.dto';

@Injectable()
export class UserService {
    constructor(@Inject(PG_CONNECTION) private conn : any){}

    async createUserClient(userClient : UserClientDto){
        await this.conn.query(`INSERT INTO usuario (nombre_usuario, contrasenia)`)
    }
}
