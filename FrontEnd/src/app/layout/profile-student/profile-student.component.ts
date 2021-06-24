import { first, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
    selector:'profile',
    templateUrl:'./profile-student.component.html',
    styleUrls:['./profile-student.component.scss']
})

export class ProfileComponent implements OnInit{
    ProfileGroup:FormGroup;
    submitted = false;
    id:any
    profileData :any;
    stdntData :any;
    constructor(private formBuilder:FormBuilder,
        private route: ActivatedRoute,   private router : Router,
        private userService:UserService) {
        this.id = (this.route.snapshot.paramMap.get('id'));

    }


    ngOnInit() {
        this.ProfileGroup = this.formBuilder.group({
            stuentName:[''],
            email:[''],
            vacName:[''],
            dgrename:[''],
            gradMarks:[''],
            gpaVal:[''],
            status:['']
        });
        this.loadData()
    }

    loadData() {
        this.userService.getProfileData(this.id).pipe(
            map(users=>{
                const user = users[0]
                this.profileData = user;
                this.ProfileGroup.controls['email'].setValue(this.profileData.StudentEmail)
                this.ProfileGroup.controls['vacName'].setValue(this.profileData.name)
                this.ProfileGroup.controls['status'].setValue(this.profileData.status)
                    return users
            }),
            mergeMap(user=>{
                const id = user[0].StudentEmail
                const student = this.userService.getByIdstudent(id)

                return forkJoin([student])
            }

            )
        ).subscribe(
            final=>{
                console.log(final)
                this.stdntData = final[0]
                this.ProfileGroup.controls['stuentName'].setValue(this.stdntData[0].fullName)
                this.ProfileGroup.controls['dgrename'].setValue(this.stdntData[0].universityName)
                this.ProfileGroup.controls['gradMarks'].setValue(this.stdntData[0].gradMark)
                this.ProfileGroup.controls['gpaVal'].setValue(this.stdntData[0].gpaMark)
            }
        )
    }

    get f() {
        return this.ProfileGroup.controls
    }

    onClikViewCV() {
        let _downloadFile = {
            "Uploaded folder name":this.profileData.vacnyId,
            "originalName":this.profileData.fileName
        }
        this.userService.downloadCVFile(_downloadFile).pipe(first())
          .subscribe(
            response=>{
             let myBlob: Blob = new Blob([response], {type: `${ this.profileData.fileType}`});
             var fileURL = URL.createObjectURL(myBlob);
             window.open(fileURL);
            }
          )

    }

    onSubmit() {

    this.userService.updateJob(this.profileData._id).pipe(first())
    .subscribe(res=>{
       this.loadData()
    })


    }
}
