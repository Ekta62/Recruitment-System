import { first, map, mergeMap } from 'rxjs/operators';
import { SweetAlertPopUps } from './../../_helper/sweet-alert-popups';
import { AlertMessages, SweetAlertHeader } from './../../_models/constant-message';
import { AdminstrationService } from '../../services/adminstration.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { LeanersHelper } from '../../_helper/leaners-helperClass';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
@Component({
    selector: 'create-job',
    templateUrl: './create-job.component.html',
    styleUrls: ['./create-job.component.scss']
})

export class CreateJobComponent implements OnInit {
    creatJobForm: FormGroup;
    submitted = false;
    uploadData: any;
    constructor(private userService: UserService,
        private formBuilder: FormBuilder,
        private cd: ChangeDetectorRef,
        private router : Router,
        private administrationService: AdminstrationService) {
    }

    ngOnInit() {
        this.creatJobForm = this.formBuilder.group({
            vacnyId: ['', Validators.required],
            name: ['', Validators.required],
            companyName: ['', Validators.required],
            companyemail: ['', Validators.required],
            companyId: ['', Validators.required],

            note: ['', Validators.required],
            fileName: ['', Validators.required],
            file: ['', Validators.required],
            fileType: ['', Validators.required],
            originalName: ['', Validators.required],
        });
        this.administrationService.currentUser.subscribe(x => {
            this.creatJobForm.controls['companyName'].setValue(x.fullName)
            this.creatJobForm.controls['companyemail'].setValue(x.email)
            this.creatJobForm.controls['companyId'].setValue(x._id)
        });
        this.creatJobForm.controls['vacnyId'].setValue(LeanersHelper.systemIdGenratr('V'));
    }
    get f() {
        return this.creatJobForm.controls;
    }

    uploadFile(event) {
        const fileEvnet = event.target.files[0];
        this.uploadData = fileEvnet;
        let reader = new FileReader(); // HTML5 FileReader API
        let file = event.target.files[0];
        this.creatJobForm.controls['fileName'].setValue(file.name);
        this.creatJobForm.controls['fileType'].setValue(file.type);
        this.creatJobForm.controls['originalName'].setValue(file.name);
        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);
            this.creatJobForm.controls['file'].setValue(
                fileEvnet
            );
            this.cd.markForCheck();
        }
    }



    onSubmit() {
this.submitted = true
        let fileObje = {
            vacnyId: this.f.vacnyId.value,
            fileType: this.f.fileType.value,
            originalName: this.f.originalName.value,
            fileName: this.f.fileName.value,
            companyId: this.f.companyId.value,
            name: this.f.name.value

        };
        if (this.creatJobForm.valid) {
            const formData = new FormData();
            formData.append('file', this.uploadData);
            this.userService.fileUpload(formData, this.f.vacnyId.value)
                .pipe(map(file => {
                    const result = file
                    console.log(file);
                    return result;
                }),
                    mergeMap(response => {
                        const saveRequest = this.userService.creatjob(this.creatJobForm.value, fileObje);
                        return forkJoin([saveRequest])
                    })
                ).subscribe(
                    final => {
                        console.log(final)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title:'Created !',
                            text: AlertMessages.SUCCESSMESSAGEFORJOB,
                            showConfirmButton: false,
                            timer: 2000
                          })
                          setTimeout(()=>{
                            this.router.navigate(['/view-job']);
                          },1500)

                    },
                    err=>{
                        console.log(err)
                    }
                );
            this.submitted = true

        }else{
         const validation = (this.f.file.value == '')?'Upload the job reference file':AlertMessages.ERRORMESSAGEFORFORMVALIDATION
            Swal.fire({
                position: 'center',
                icon: 'error',
                title:'Error.',
                text:validation,
                showConfirmButton: false,
                timer: 2000
              })
        }
    }



}
