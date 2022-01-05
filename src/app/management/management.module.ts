import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ManagementComponent } from './management.component';
import { ManagementEditComponent } from './management-edit/management-edit.component';
import { BusinessInfoResolver } from './resolver/business-info.resolver';
import { MajorEditInfoComponent } from './management-edit/edit-info/major-edit-info/major-edit-info.component';
import { CourseEditInfoComponent } from './management-edit/edit-info/course-edit-info/course-edit-info.component';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { BusinessListResolver } from './resolver/business-list.resolver';
import { AgGrideService } from './service/ag-gride.service';
import { TeacherEidtInfoComponent } from './management-edit/edit-info/teacher-edit-info/teacher-eidt-info.component';
import { ClassEditInfoComponent } from './management-edit/edit-info/class-edit-info/class-edit-info.component';
import { MajorEditAssociateComponent } from './management-edit/edit-associate/major-edit-associate/major-edit-associate.component';
import { TeacherEditAssociateComponent } from './management-edit/edit-associate/teacher-edit-associate/teacher-edit-associate.component';
import { StudentEditInfoComponent } from './management-edit/edit-info/student-edit-info/student-edit-info.component';
import { ClassEditAssociateComponent } from './management-edit/edit-associate/class-edit-associate/class-edit-associate.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild([
            {
              path: ':business',
              resolve: { listResolvedData: BusinessListResolver },
              component: ManagementComponent
             },
             {
              path: ':business/edit/:id',
              component: ManagementEditComponent,
            //   canDeactivate: [ProductEditGuard],
              resolve: { infoResolvedData: BusinessInfoResolver },
              children: [
                // { path: '', redirectTo: 'majorInfo', pathMatch: 'full' },
                { path: 'courseInfo', component: CourseEditInfoComponent },
                { path: 'majorInfo', component: MajorEditInfoComponent },
                { path: 'teacherInfo', component: TeacherEidtInfoComponent },
                { path: 'classInfo', component: ClassEditInfoComponent },
                { path: 'majorAssociate', component: MajorEditAssociateComponent },
                { path: 'teacherAssociate', component: TeacherEditAssociateComponent },
                { path: 'studentInfo', component: StudentEditInfoComponent },
                { path: 'classAssociate', component: ClassEditAssociateComponent }
              ]
            }
          ])
    ],
    exports: [],
    declarations: [ManagementComponent,
      ManagementEditComponent,
      MajorEditInfoComponent,
      CourseEditInfoComponent,
      TeacherEidtInfoComponent,
      ClassEditInfoComponent,
      MajorEditAssociateComponent,
      TeacherEditAssociateComponent,
      StudentEditInfoComponent,
      ClassEditAssociateComponent],
    providers: [AgGrideService],
})
export class ManagementModule { }
