import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupCompanyComponent } from './signup.component';


const routes: Routes = [
    {
        path: '',
        component: SignupCompanyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignupCompanyRoutingModule {}
