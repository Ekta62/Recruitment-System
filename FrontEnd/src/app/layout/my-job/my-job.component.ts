import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector:'my-job',
    templateUrl:'./my-job.component.html',
    styleUrls:['./my-job.component.scss']
})

export class MyJobComponent implements OnInit{
    searchText;
    jobData:any;
    page = 1;
    p = 1;
    pageSize = 4;
    tableData


    constructor(private userService:UserService){

    }


    ngOnInit() {
        this.userService.myAppliedJobs(this.userService.currentUserValue.email)
        .pipe(first())
        .subscribe(
            res=>{
                this.jobData = res
                console.log(res)
            }
        )


    }
}
