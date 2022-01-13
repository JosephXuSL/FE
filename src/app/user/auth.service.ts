import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiClient, GetMajorRequestBody, TeacherAccount } from '../api-client';
import { map } from 'rxjs/operators';
import { ManagementServiceMapper } from '../management/service/management.service.mapper';
import { Router } from '@angular/router';
import { User } from './user';
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User;
  redirectUrl: string;

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private messageService: MessageService, private apiClient: ApiClient, private router: Router) { }

  public login(userName: string, password: string): Observable<boolean> {
    if (userName === 'admin' && password === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true
      };
      this.messageService.addMessage('Admin login');
      if (this.redirectUrl) {
        this.router.navigateByUrl(this.redirectUrl);
      } else {
        this.router.navigate(['/welcome']);
      }
      sessionStorage.setItem('user', userName);
      sessionStorage.setItem('issuperadmin', '1');
      sessionStorage.setItem('isadmin', '1');
      sessionStorage.setItem('teachernumber', userName);
      sessionStorage.setItem('ismentor', '0');
      return of(true);
    }
    return this.searchAccount(userName, password).pipe(map(res => {
      if (res && res.id) {
        this.currentUser = {
          id: res.id,
          isMentor: res.teacher.isMentor,
          status: res.accountStatus,
          userName: res.teacher.name,
          //要改的
          isAdmin: res.isMentorAccount
        };
        this.messageService.addMessage('login Success!');
        if (this.redirectUrl) {
          this.router.navigateByUrl(this.redirectUrl);
        } else {
          this.router.navigate(['/welcome']);
        }
        sessionStorage.setItem('user', res.teacher.name);
        sessionStorage.setItem('teachernumber', userName);
        sessionStorage.setItem('teacherid', res.teacher.id.toString());
        sessionStorage.setItem('issuperadmin', '0');
        sessionStorage.setItem('isadmin', this.currentUser.isAdmin ? '1' : '0');
        sessionStorage.setItem('ismentor', this.currentUser.isMentor ? '1' : '0');

        return true;
      } else {
        this.messageService.addMessage('Please enter your correct userName and password');
        return false;
      }

    }));
  }
  logout(): void {
    this.currentUser = null;
    sessionStorage.clear();
  }
  public searchAccount(accountName: string, password: string): Observable<TeacherAccount> {
    return this.apiClient
    .getTeacherAccountByTeacherNameAndPassword(accountName, password, 'details')
    .pipe(map((res: TeacherAccount) => ManagementServiceMapper.mapTeacherAccountInput(res)));
  }
}
