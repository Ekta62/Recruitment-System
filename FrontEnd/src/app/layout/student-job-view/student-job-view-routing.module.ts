
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentJobViewComponent } from './student-job-view.component';



const routes: Routes = [
    {
        path: '',
        component: StudentJobViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudentJobViewRoutingModule {}
