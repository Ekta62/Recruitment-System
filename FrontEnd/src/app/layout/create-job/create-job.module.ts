import { ReactiveFormsModule } from '@angular/forms';
import { CreateJobRoutingModule } from './create-job-routing.module';
import { CreateJobComponent } from './create-job.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAlertModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { StatModule } from '../../shared';




@NgModule({
    imports: [CommonModule, NgbCarouselModule, NgbAlertModule,
        ReactiveFormsModule,

        CreateJobRoutingModule, StatModule],
    declarations: [CreateJobComponent,]
})
export class CreateJobModule {}
