import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ManagementService } from '../service/management.service';

@Injectable({ providedIn: 'root' })
export class BusinessListResolver implements Resolve<any> {

    constructor(private managementService: ManagementService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.managementService.getAllListData(route.params.business);
    }
}
