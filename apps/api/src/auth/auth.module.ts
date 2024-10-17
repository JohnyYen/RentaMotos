import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt"
import {JWT_CONSTANTS} from "../constants";
import { JwtStrategy } from './jwtStrategy';
import { PgModule } from 'src/models/pg.module';


@Module({
  imports: [PgModule,PassportModule, JwtModule.register({
    secret: JWT_CONSTANTS.secret,
  }) ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
