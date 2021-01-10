import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(
        private router: Router
    )
    {}

    canActivate(): boolean {
        if(window.localStorage.getItem("isLogin") != "true"){
            this.router.navigate([ '/login' ]);
            return false;
        }else{
            return true;
        }
    }
}