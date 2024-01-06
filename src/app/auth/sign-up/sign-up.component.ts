import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  formGroup!: FormGroup;
  signup: FormGroup | any;
  error: any;
  show: boolean = true;
  chnageView: boolean = true;
  display: boolean = true;
  changeDisplay: boolean = true;

  constructor(
    private _route: Router,
    private http: HttpClient,
    public commonservice: CommonService,
    private formBuilder: FormBuilder
  ) {
    this.signup = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required, this.Name_Validator()]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
        phone: new FormControl('', [Validators.pattern('^[6-9][0-9]{9}$')]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}$'
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {}

  get name() {
    return this.signup.get('name');
  }

  get email() {
    return this.signup.get('email');
  }

  get phone() {
    return this.signup.get('phone');
  }

  get password() {
    return this.signup.get('password');
  }

  get confirmPassword() {
    return this.signup.get('confirmPassword');
  }

  Name_Validator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == false) {
        return { Validators: true };
      } else if (/^[^0-9]+$/.test(control.value) == false) {
        return { no_Numeric: true };
      } else if (/^[\w\s]+$/.test(control.value) == false) {
        return { no_Special_Character: true };
      }
      return null;
    };
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return;
      } else if (control.value !== matchingControl.value) {
        matchingControl.setErrors({
          MustMatch: true,
          message: "Confirm password didn't match!",
        });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  async signupdata(formData: any) {
    const name = formData['name'];
    const email = formData['email'];
    const phone = formData['phone'];
    const password = formData['password'];
    await this.commonservice
      .post(
        {
          name: name,
          email: email,
          phone: phone,
          password: password,
        },
        'user/signup'
      )
      .subscribe((res) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        console.log(apiResult);

        if (apiResult['result'] == 'error') {
          apiResult.errors.map((err: object) => {
            this.error = JSON.parse(JSON.stringify(err));
            console.log(this.error);
            console.log(this.error['msg']);
          });
        } else {
          this.error = '';
          this.signup.reset();
          // $('#myModal').hide();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sign Up Successful',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  viewdata() {
    this.show = !this.show;
    this.chnageView = !this.chnageView;
  }

  viewPass() {
    this.display = !this.display;
    this.changeDisplay = !this.changeDisplay;
  }
}
