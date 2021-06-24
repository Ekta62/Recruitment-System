
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../../shared';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StudentJobViewComponent } from './student-job-view.component';
import { StudentJobViewRoutingModule } from './student-job-view-routing.module';




@NgModule({
    imports: [CommonModule, NgbCarouselModule, NgbAlertModule,
        ReactiveFormsModule, FormsModule,  NgxPaginationModule ,
        Ng2SearchPipeModule,
        StudentJobViewRoutingModule , StatModule],
    declarations: [StudentJobViewComponent]
})
export class StudentJobViewModule {}
