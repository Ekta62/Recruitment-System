import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { Role } from '../_models/role';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'view-job', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                loadChildren: () => import('./view-job/view-job.module').then((m) => m.ViewJobModule)
            },
            {
                path: 'create-job',
                loadChildren: () => import('./create-job/create-job.module').then((m) => m.CreateJobModule)
            },

            {
                path: 'view-job',
                loadChildren: () => import('./view-job/view-job.module').then((m) => m.ViewJobModule)
            },
            {
                path: 'applied-job/:id',
                loadChildren: () => import('./applied-job/applied-job.module').then((m) => m.JobAppliedModule)
            },

            {
                path: 'created-job/:id',
                loadChildren: () => import('./student-job-view/student-job-view.module').then((m) => m.StudentJobViewModule)
            },
            {
                path: 'components',
                loadChildren: () => import('./bs-component/bs-component.module').then((m) => m.BsComponentModule)
            },

            {
                path: 'student-profile/:id',
                loadChildren: () => import('./profile-student/profile-student.module').then((m) => m.ProfileModule)
            },


            {
                path: 'my-job',
                loadChildren: () => import('./my-job/my-job.module').then((m) => m.MyJobModule)
            },


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
