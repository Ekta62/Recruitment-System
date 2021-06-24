import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SignupCompanyRoutingModule } from './signup-routing.module';



import { SignupCompanyComponent } from './signup.component';




@NgModule({
    imports: [CommonModule, TranslateModule, SignupCompanyRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [SignupCompanyComponent]
})
export class SignupCompanyModule {}
