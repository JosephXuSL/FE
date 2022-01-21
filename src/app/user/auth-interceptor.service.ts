import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    private storage: any;

    constructor(private _router: Router) {
        this.storage = sessionStorage;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.getToken())
          });
        return next.handle(authReq).pipe(tap(_ => { }, error => {
            const respError = error as HttpErrorResponse;
            if (respError && (respError.status === 401 || respError.status === 403)) {
                alert('会话过期，请重新登录！');
                this._router.navigate(['/login']);
                sessionStorage.clear();
            }
        }));
    }

    private getToken(): string {
        const token = this.storage.getItem('token');
        return token && typeof token !== 'undefined'
          ? token
          : null;
      }
}
