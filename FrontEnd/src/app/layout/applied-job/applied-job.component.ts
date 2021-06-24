import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, map, mergeMap } from 'rxjs/operators';
import { UserService } from './../../services/user.service';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { forkJoin } from 'rxjs';
import { LeanersHelper } from '../../_helper/leaners-helperClass';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
@Component({
    selector:'applied-job',
    templateUrl:'./applied-job.component.html',
    styleUrls:['./applied-job.component.scss']
})


export class AppliedJobComponent implements OnInit{
    searchText;
    errorMessage = '';
    showError = false;
    jobData:any;
    page = 1;
    jobObj :any
    p = 1;
    submitted = false;
    id:any
    pageSize = 4;
    jobForm:FormGroup;
    successMesageb = false;
    SuccessMesage :any;
    uploadData :any
    constructor(  private route: ActivatedRoute, private userService:UserService,
        private formBuilder :FormBuilder,  private cd: ChangeDetectorRef,) {
    }
    ngOnInit() {
        this.jobForm = this.formBuilder.group({
            vacnyId:[''],
            name: ['', Validators.required],
            companyName: ['', Validators.required],
            companyemail: ['', Validators.required],
            companyId: ['', Validators.required],
            applyId:[''],
            studentName:[''],
            StudentEmail:[''],
            status:[1],
            note: ['', Validators.required],
            fileName: ['', Validators.required],
            file: ['', Validators.required],
            fileType: ['', Validators.required],
            originalName: ['', Validators.required],
        })
        this.loadDefault();
    }

    loadDefault() {
        this.id = (this.route.snapshot.paramMap.get('id'));
        this.userService.getByIdJob(this.id).pipe(first()).subscribe(
            res=>{
                this.jobObj = res[0]
                this.jobForm.controls['vacnyId'].setValue(this.jobObj.vacnyId);
                this.jobForm.controls['name'].setValue(this.jobObj.name)
                this.jobForm.controls['note'].setValue(this.jobObj.note)
                this.jobForm.controls['companyName'].setValue(this.jobObj.companyName)
                this.jobForm.controls['companyemail'].setValue(this.jobObj.companyemail);
                this.jobForm.controls['companyId'].setValue(this.jobObj.companyId);
                this.jobForm.controls['applyId'].setValue(LeanersHelper.systemIdGenratr('A'));
                this.jobForm.controls['StudentEmail'].setValue(this.userService.currentUserValue.email);
                this.jobForm.controls['studentName'].setValue(this.userService.currentUserValue.fullName);
             //   console.log(res)
            }
        )
    }
    get applyJobHeader() {
        if(this.jobObj.name)
       return `${this.jobObj.name} Vacancy`

       if(this.jobObj.name == undefined){
        return `Job Vacancy`
       }

    }
    get f() {
        return this.jobForm.controls;
    }


    uploadFile(event) {
        const fileEvnet = event.target.files[0];
        this.uploadData = fileEvnet;
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        this.jobForm.controls['fileName'].setValue(file.name);
        this.jobForm.controls['fileType'].setValue(file.type);
        this.jobForm.controls['originalName'].setValue(file.name);
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            this.jobForm.controls['file'].setValue(
                fileEvnet
            );
            this.cd.markForCheck();
        }
    }

    onClickViewFile() {
        let _downloadFile = {
            "Uploaded folder name":this.f.vacnyId.value,
            "originalName":this.jobObj.fileName
        }
        this.userService.downloadFile(_downloadFile).pipe(first())
          .subscribe(
            response=>{
             let myBlob: Blob = new Blob([response], {type: `${ this.jobObj.fileType}`});
             var fileURL = URL.createObjectURL(myBlob);
             window.open(fileURL);
            }
          )

    };

    onSubmit() {

        // Swal.fire('Error..', `Can not insert same Contact numbers`, 'error');
        this.showError = false
        this.submitted = true;
        this.errorMessage = ''
        let fileObje = {
            vacnyId: this.f.vacnyId.value,
            studentemail:this.userService.currentUserValue.email,
            fileType: this.f.fileType.value,
            originalName: this.f.originalName.value,
            fileName: this.f.fileName.value,
            companyId: this.f.companyId.value,
            name: this.f.name.value

        };
        if (this.jobForm.valid) {
            const formData = new FormData();
            formData.append('file', this.uploadData);
            this.userService.fileCVUpload(formData, this.f.vacnyId.value)
                .pipe(map(file => {
                    const result = file
                    console.log(file);
                    return result;
                }),
                    mergeMap(response => {
                        const saveRequest = this.userService.saveJobApplied(this.jobForm.value, fileObje);
                        return forkJoin([saveRequest])
                    })
                ).subscribe(
                    final => {
                        this.SuccessMesage = 'Sucessfully applied to the vacanvy';
                        this.successMesageb = true
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Sucessfully applied to the vacancy',
                            showConfirmButton: false,
                            timer: 2000
                          })
                    },
                    err=>{
                        this.successMesageb = false
                        this.showError =true
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: err.error,
                            showConfirmButton: false,
                            timer: 2000
                          })
                        this.errorMessage = err.error
                    }
                );
            this.submitted = true

        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Please upload your CV',
                showConfirmButton: false,
                timer: 2000
              })
        }
}

}
