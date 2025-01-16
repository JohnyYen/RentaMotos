import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "./role.enum";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){}