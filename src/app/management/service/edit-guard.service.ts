import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ManagementEditComponent } from './../management-edit/management-edit.component';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable({providedIn: 'root'})
export class EditGuard implements CanDeactivate<ManagementEditComponent> {
    canDeactivate(
        component: ManagementEditComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        if (component.isDirty) {
            return confirm(`当前有改动，继续离开当前页面将丢失未保存数据`);
          }
        return true;
    }
}
