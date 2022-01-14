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
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

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
    FormsModule,
    NzIconModule,
    IconsProviderModule,
    NgZorroAntdModule
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
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class AppModule { }
