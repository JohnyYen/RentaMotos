import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt"
import {JWT_CONSTANTS} from "../constants";
import { JwtStrategy } from './jwtStrategy';
import { PgModule } from 'src/pg/pg.module';
import { AuthController } from './auth.controller';


@Module({
  controllers: [AuthController],
  imports: [PgModule,PassportModule, JwtModule.register({
    secret: JWT_CONSTANTS.secret,
    signOptions: {expiresIn: '20h'}
  }) ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
