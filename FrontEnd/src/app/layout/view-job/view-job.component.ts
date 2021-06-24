
import { Role } from './../../_models/role';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
   selector:'view-job',
   templateUrl:'./view-job.component.html',
   styleUrls:['./view-job.component.scss']
})

export class ViewJobComponent implements OnInit {
    searchText;
    jobData:any;
    page = 1;
    p = 1;
    pageSize = 4;
    constructor(private userService:UserService,
        private router : Router) {

    }
    ngOnInit() {
        this.loadDefault();
    }
    loadDefault() {
        const role = this.userService.currentUserValue.role
        const email = (role == Role.student)?'111':this.userService.currentUserValue.email
            this.userService.loadData(email)
            .pipe(first()).subscribe(
                res=>{
                    this.jobData = res
                    console.log(res)
                }
            )
    }

    onClickRouteJob(data) {
        const id = data.vacnyId;

        this.router.navigate(['/created-job',id]);

    }

    onClickRouteApply(data) {
        const id = data.vacnyId;
        this.router.navigate(['/applied-job',id]);

    }

    get currentRole() {
      if(this.userService.currentUserValue.role && Role.student){
                if(this.userService.currentUserValue.role == Role.student){

                    return true;
                }
      }
      return false
    }

    get getJobHeader() {
        if(this.userService.currentUserValue.role == Role.student){

                return ' All created jobs'

        }
        return ' All Vacancy  status'
    }

    onClickdelete(data){

  Swal.fire({
    title: 'Are you sure?',
    text: "It will permanently deleted !",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result)=>{
    if(result.isConfirmed){
        this.userService.deleteJob(data._id).pipe(first()).subscribe(
            res=>{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title:'Error.',
                    text:'Your file has been deleted.',
                    showConfirmButton: false,
                    timer: 2000
                  })
                this.loadDefault();

            }
        )
        // this.load
        // this.userService.deleteJob(data._id).pipe(first()).subsc


    }

    // Swal.fire(
    //   'Deleted!',
    //   'Your file has been deleted.',
    //   'success'
    // );
  })
    }


}
