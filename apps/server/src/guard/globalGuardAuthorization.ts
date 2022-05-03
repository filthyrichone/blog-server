import { CacheStore, CACHE_MANAGER, CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Cache } from "cache-manager";

@Injectable()
export class GlobalAuthorizationGuard implements CanActivate {
    constructor(@Inject(CACHE_MANAGER)private cahche: Cache) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return this.cahche.get('token').then(val => {
            console.log(val);
            return true;
        })
    }
    
}