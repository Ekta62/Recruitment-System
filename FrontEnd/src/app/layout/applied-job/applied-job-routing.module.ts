import { AppliedJobComponent } from './applied-job.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
    {
        path: '',
        component: AppliedJobComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobAppliedRoutingModule {}
