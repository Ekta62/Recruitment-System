import { ViewJobComponent } from './view-job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../../shared';
import { ViewJobRoutingModule } from './view-job-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




@NgModule({
    imports: [CommonModule, NgbCarouselModule, NgbAlertModule,
        ReactiveFormsModule, FormsModule,  NgxPaginationModule ,
        Ng2SearchPipeModule,
        ViewJobRoutingModule, StatModule],
    declarations: [ViewJobComponent,]
})
export class ViewJobModule {}
