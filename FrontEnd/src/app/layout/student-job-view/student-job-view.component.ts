import { first } from 'rxjs/operators';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
    selector:'student-job-view',
    templateUrl:'./student-job-view.component.html',
    styleUrls:['./student-job-view.component.scss']
})

export class StudentJobViewComponent implements OnInit {
    searchText;
    jobData:any;
    page = 1;
    p = 1;
    pageSize = 4;
    id:any
    constructor(private userService:UserService, private route: ActivatedRoute,   private router : Router) {
        this.id = (this.route.snapshot.paramMap.get('id'));

    }

  ngOnInit() {
      this.loadDefaultData()

  }

  loadDefaultData() {

    this.userService.getByIdJobApplied( this.id).pipe(first()).subscribe(
        res=>{
            console.log(res)
            this.jobData = res
        }
    )


  }
  onClickRouteJob(data) {
      const id =data._id;
    this.router.navigate(['/student-profile',id]);
  }

}
