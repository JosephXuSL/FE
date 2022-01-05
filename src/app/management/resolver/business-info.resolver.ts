import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ManagementService } from '../service/management.service';

@Injectable({ providedIn: 'root' })
export class BusinessInfoResolver implements Resolve<any> {

    constructor(private managementService: ManagementService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const id = route.paramMap.get('id');
        if (isNaN(+id)) {
          const message = `Product id was not a number: ${id}`;
          console.error(message);
          return of({ data: null, error: message });
        }

        return this.managementService.getInfoData(route.paramMap.get('business') , +id)
          .pipe(
            map(data => ({ data: data })),
            catchError(error => {
              const message = `Retrieval error: ${error}`;
              console.error(message);
              return of({ data: null, error: message });
            })
          );
    }
}
