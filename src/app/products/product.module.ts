import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductResolver } from './product-resolver.service';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';
import { StudentInfoComponent } from './teacher/student-info/student-info.component';
import { CourseInfoComponent } from './teacher/course-info/course-info.component';
import { CourseInfobyMentorComponent } from './teacher/course-infoby-mentor/course-infoby-mentor.component';
import { ClassinfobymentorComponent } from './teacher/classinfobymentor/classinfobymentor.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
@NgModule({
  imports: [
    SharedModule,
    AgGridModule.withComponents([]),
    NzTableModule,
    NzFormModule,
    RouterModule.forChild([
      {
        path: 'studentInfo',
        component: StudentInfoComponent,
      },
      {
        path: 'courseInfo',
        component: CourseInfoComponent,
      },
      {
        path: 'courseInfobyMentor',
        component: CourseInfobyMentorComponent,
      },
      {
        path: 'classInfobyMentor',
        component: ClassinfobymentorComponent,
      }
    ])
  ],
  declarations: [
    StudentInfoComponent,
    CourseInfoComponent,
    CourseInfobyMentorComponent,
    ClassinfobymentorComponent
  ]
})
export class ProductModule { }
