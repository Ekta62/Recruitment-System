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
export class SignupCompanyComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    erroMessage = ''
    constructor( private formBuilder: FormBuilder ,
        private userService: UserService , private router :Router
        ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            companyId:['',Validators.required],
            companyName: ['', Validators.required],
            email:['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        },
        {
            validator: this.MustMatch('password', 'confirmPassword')
        });
        this.registerForm.controls['companyId'].setValue(LeanersHelper.systemIdGenratr('C'));
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
                    let companyData = {
                        companyId:this.signupf.companyId.value,
                        companyName : this.signupf.companyName.value,
                        role:'company',
                        active : true,
                        password: this.signupf.password.value,
                        email: this.signupf.email.value,
                    };
                    let userData = {
                        studentId:this.signupf.companyId.value,
                        fullName : this.signupf.companyName.value,
                        role:'company',
                        active : true,
                        password: this.signupf.password.value,
                        email: this.signupf.email.value,
                    };

                this.userService.companyRegister(companyData ,userData)
                .pipe(first()).subscribe(
                    res=>{
                        console.log(res);
                        this.registerForm.reset();
                        this.router.navigate(['/login'])
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
