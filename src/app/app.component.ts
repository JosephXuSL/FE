import { Component } from '@angular/core';
import { NzLayoutComponent } from 'ng-zorro-antd';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';
import { businessList } from './models/business';
@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  pageTitle = '后台管理';
  loading = true;
  businessList = businessList;
  username: string;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isLoggedInSession(): boolean {
    this.username = sessionStorage.getItem('user');
    return sessionStorage.getItem('user') && sessionStorage.getItem('user').length > 0;
  }
  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get userName(): string {
    if (sessionStorage.getItem('user')) {
      return sessionStorage.getItem('user');
    }
    return '';
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
    sessionStorage.clear();
  }
  ismentor(): boolean {
    if (sessionStorage.getItem('ismentor') === '1') {
      return true;
    }
    return false;
  }
  isadmin(): boolean {
    if (sessionStorage.getItem('isadmin') === '1') {
      return true;
    }
    return false;
  }
  issuperadmin(): boolean {
    if (sessionStorage.getItem('issuperadmin') === '1') {
      return true;
    }
    return false;
  }
  islogin(): boolean {
    if (sessionStorage.getItem('user')) {
      return true;
    }
    return false;
  }
}
