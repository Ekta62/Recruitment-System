import { UserService } from '../../../services/user.service';
import { AdminstrationService } from '../../../services/adminstration.service';

import { User } from './../../../_models/user';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    private currentUserSubject: BehaviorSubject<User>;
    public currentLoginUser: Observable<User>;
    currentUser
    constructor(private translate: TranslateService, public router: Router,
        private administrationService:AdminstrationService ,
        private userService:UserService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.administrationService.currentUser.subscribe(x => this.currentUser = x);
    }
    logout(): void {
        this.userService.logout();

         if(this.currentUser.role == 'student'){
            this.router.navigate(['/student-login']);
         }else{
            this.router.navigate(['/login']);
         }

      }
    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    get getRole() {
        if(this.currentUser.role == 'User'){
            return 'Cashier'
        }
        return this.currentUser.role
       }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    profilePageLoad() {
        const UserId = this.currentUserSubject.value._id;

         this.router.navigate(['/profile',UserId]);
    }


}
