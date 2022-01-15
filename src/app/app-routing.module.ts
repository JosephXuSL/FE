import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './home/change-password/change-password.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
import { SelectiveStrategy } from './selective-strategy.service';
import { BasicInformationComponent } from './home/basic-information/basic-information.component';
import { StudentEnrollsearchComponent } from './home/student-enrollsearch/student-enrollsearch.component';
import { StudentSearchexamscoreComponent } from './home/student-searchexamscore/student-searchexamscore.component';
import { CreateTeacherAccountComponent } from './home/create-teacher-account/create-teacher-account.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'enrollsearchfrostudent', component: StudentEnrollsearchComponent },
      { path: 'examsearchfrostudent', component: StudentSearchexamscoreComponent },
      { path: 'createteacheraccount',
      canActivate: [AuthGuard],
      component: CreateTeacherAccountComponent },
      {
        path: 'basicInfo',
        canActivate: [AuthGuard],
        component: BasicInformationComponent
      },
      {
        path: 'changePassword',
        canActivate: [AuthGuard],
        component: ChangePasswordComponent
      },
      { path: 'management',
      canActivate: [AuthGuard],
      loadChildren: () =>
      import('./management/management.module').then(m => m.ManagementModule)
      },
      {
        path: 'products',
        canActivate: [AuthGuard],
        data: { preload: false },
        loadChildren: () =>
          import('./products/product.module').then(m => m.ProductModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ],
      {
        preloadingStrategy: SelectiveStrategy,
        onSameUrlNavigation: 'reload',
        useHash: true
      })   // , { enableTracing: true, preloadingStrategy: SelectiveStrategy }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
