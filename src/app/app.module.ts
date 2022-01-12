import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './home/change-password/change-password.component';
import { BasicInformationComponent } from './home/basic-information/basic-information.component';
import { StudentEnrollsearchComponent } from './home/student-enrollsearch/student-enrollsearch.component';
import { AgGridModule } from 'ag-grid-angular';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { ProductData } from './products/product-data';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { StudentSearchexamscoreComponent } from './home/student-searchexamscore/student-searchexamscore.component';
import { CreateTeacherAccountComponent } from './home/create-teacher-account/create-teacher-account.component';
/* Feature Modules */
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';

@NgModule({
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    HttpClientModule,
    // InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    UserModule,
    MessageModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    BasicInformationComponent,
    StudentEnrollsearchComponent,
    StudentSearchexamscoreComponent,
    CreateTeacherAccountComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
