import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from '../../services/utils/loading.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class SessionWatcher implements HttpInterceptor {
    constructor(
        private loadingService: LoadingService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.getJWTFromCookie();
        let request = req;

        if (jwt) {
            request = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + jwt
                }
            });
        }

        this.loadingService.addRequestCount();
        return next.handle(request).pipe(
            finalize(() => {
                this.loadingService.subtractRequestCount();
            }),
            catchError(response => {
                if (response instanceof HttpErrorResponse) {
                    // Realiza las acciones necesarias en caso de error
                }
                return throwError(response);
            })
        );
    }

    private getJWTFromCookie(): string {
        const name = 'JWT=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];

            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }

            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }

        return '';
    }
}
