import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";


@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {
    constructor(private router: Router){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                if([401, 403].indexOf(err.status) !== -1)
                    this.router.navigate(['forbidden']);
                
                var error = (err.status != 403) ? err : 'Privilegi insufficienti';

                return throwError(() => error);
            })
        )
    }
}