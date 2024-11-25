import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){
    constructor(private reflector: Reflector){
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        
        console.log(isPublic);

        if(isPublic)
            return true;

        return super.canActivate(context);
    }
}