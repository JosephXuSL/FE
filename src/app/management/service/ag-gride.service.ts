import { Injectable } from '@angular/core';
import { ColDef, GridApi, GridOptions, IFilterOptionDef  } from 'ag-grid-community';
import { Business } from 'src/app/models/business';

@Injectable()
export class AgGrideService {
    constructor() { }

    public getColumnDefs(business: Business): ColDef[] {
        const defs = [] as ColDef[];
        business.gridHeader.forEach(h => defs.push({
            headerName: h.headerName,
            field: h.field,
            sortable: true,
            filter: true,
            filterParams:
            {
                filterOptions: [
                    {
                        displayKey: 'contain',
                        displayName: '包含',
                        predicate: ([fv0], cellValue) =>
                            cellValue != null && cellValue.indexOf(fv0) !== -1,
                        numberOfInputs: 1
                    },
                    {
                        displayKey: 'nocontain',
                        displayName: '不包含',
                        predicate: ([fv0], cellValue) =>
                            cellValue != null && cellValue.indexOf(fv0) === -1,
                        numberOfInputs: 1
                    },
                    {
                        displayKey: 'regexp',
                        displayName: '正则表达式',
                        predicate: ([fv1], cellValue) =>
                            cellValue == null || new RegExp(fv1, 'gi').test(cellValue),
                        numberOfInputs: 1
                    }
                ],
                suppressAndOrCondition: true
            }
        } as ColDef));
        return defs;
    }
}
