import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('INTERCEPTOR');        

        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('auth_app_token'));
        if (currentUser && currentUser.value) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${currentUser.value}`
                }
            });
        }

        return next.handle(request);
    }
}