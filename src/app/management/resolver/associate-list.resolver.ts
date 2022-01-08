import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ManagementService } from '../service/management.service';

@Injectable({ providedIn: 'root' })
export class AssociateListResolver implements Resolve<any> {

    constructor(private managementService: ManagementService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.managementService.getListDataById(route.params.business, route.params.associate, route.params.id);
    }
}
