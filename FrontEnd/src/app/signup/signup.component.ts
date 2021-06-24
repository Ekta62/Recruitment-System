import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { AppConstants } from '../_helper/AppConstants';
import { LeanersHelper } from '../_helper/leaners-helperClass';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    erroMessage = ''
    constructor( private formBuilder: FormBuilder ,
        private userService: UserService , private router :Router
        ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            studentId:['',Validators.required],
            fullName: ['', Validators.required],
            gpa_number: ['', Validators.required],
            email:['', [Validators.required, Validators.email]],
            universityName:['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            gMark: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        },
        {
            validator: this.MustMatch('password', 'confirmPassword')
        });
        this.registerForm.controls['studentId'].setValue(LeanersHelper.systemIdGenratr('S'));
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

  get signupf() {
    return this.registerForm.controls;
}

    onSubmit() {
            this.submitted = true;
            if(this.registerForm.valid){
                    let userData = {
                        studentId:this.signupf.studentId.value,
                        fullName : this.signupf.fullName.value,
                        gpaMark:this.signupf.gpa_number.value,
                        gradMark : this.signupf.gMark.value,
                        role:'student',
                        active : true,
                        password: this.signupf.password.value,
                        email: this.signupf.email.value,
                        universityName:this.signupf.universityName.value
                    };
                this.userService.register(userData)
                .pipe(first()).subscribe(
                    res=>{
                        console.log(res);
                        this.registerForm.reset();
                        this.router.navigate(['/student-login'])
                    },
                    error=>{
                        this.erroMessage = error
                        console.log(error)
                    },
                    ()=>{
                        console.log('Hooks done')
                    }
                )


            }
    }
}
