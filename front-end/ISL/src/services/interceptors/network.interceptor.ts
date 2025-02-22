import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingService } from "../loading.service";
import { Observable, finalize } from "rxjs";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
    constructor(private loader: LoadingService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>{
        this.loader.show();

        return next.handle(request).pipe(
            finalize(() => {
                this.loader.hide();
            })
        )
    }
}