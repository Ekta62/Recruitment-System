import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { StudentLoginRoutingModule } from './student-login-routing.module';
import { StudentLoginComponent } from './student-login.component';

@NgModule({
    imports: [CommonModule, TranslateModule, StudentLoginRoutingModule ,ReactiveFormsModule],
    declarations: [StudentLoginComponent]
})
export class StudentLoginModule {}
