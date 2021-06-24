
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JobApplyComponent } from './job-apply.component';
import { JobApplyRoutingModule } from './job-apply-routing.module';




@NgModule({
    imports: [CommonModule, NgbCarouselModule, NgbAlertModule,
        ReactiveFormsModule, FormsModule,  NgxPaginationModule ,
        Ng2SearchPipeModule,
        JobApplyRoutingModule,],
    declarations: [JobApplyComponent]
})
export class JobApplyModule {}
