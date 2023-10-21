import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  constructor(
    private _route: Router,
    private http: HttpClient,
    public commonservice: CommonService,
    private formBuilder: FormBuilder
  ) {
    this.signup = this.formBuilder.group({
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void { }

  get name() {
    return this.formGroup.get('name');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get phone() {
    return this.formGroup.get('phone');
  }

  get password() {
    return this.formGroup.get('password');
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

        if (apiResult['result'] == "error") {
          apiResult.errors.map((err: object) => {
            this.error = JSON.parse(JSON.stringify(err));
            console.log(this.error);
            console.log(this.error['msg']);
          })
        } else {
          this.error = "";
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
}
