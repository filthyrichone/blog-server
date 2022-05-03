import { CACHE_MANAGER, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class GlobalAuthorizationGuard implements CanActivate {
    constructor(@Injectable(CACHE_MANAGER) private readonly cacheManager: Cache) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        return false;
    }
}