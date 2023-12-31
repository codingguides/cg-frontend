import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('closebutton') closebutton: any;
  formGroup!: FormGroup;
  login: FormGroup | any;
  error: any;
  errr: string = "";
  error2: any;
  name: any;
  _id: any;
  visible: boolean = true;
  changetype: boolean = true;


  constructor(
    private _route: Router,
    private http: HttpClient,
    public commonservice: CommonService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.login = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: [''],
    });
  }
  ngOnInit(): void { }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  async logindata(formData: any) {
    const email = formData['email'];
    const password = formData['password'];

    await this.commonservice
      .login(
        {
          email: email,
          password: password,
        },
        'user/login'
      )
      .subscribe(res => {

        const apiResult = JSON.parse(JSON.stringify(res));
        console.log(apiResult['payload'])

        if (apiResult['result'] == "ok") {
          if (apiResult && apiResult['data']['payload']) {
            localStorage.clear();

            console.log(apiResult && apiResult['data']['token']);
            console.log(apiResult && apiResult['data']['payload']);

            localStorage.setItem("accessToken", apiResult && apiResult['data']['token']);
            sessionStorage.setItem("accessToken", apiResult && apiResult['data']['token']);
            this.name = apiResult && apiResult['data']['payload'].name.split(' ').map((n: any) => n[0]).join('');
            this._id = apiResult && apiResult['data']['payload'].id
            console.log(this.name)
            console.log(this._id)
            let token = apiResult && apiResult['data']['token']
            this.commonservice.setLoggedIn(true, this.name, this._id, token)
          }
          window.location.reload();
          this.login.reset()
          $('#myModal').hide();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sign In Successful',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // else if (apiResult['result'] == "invalid") {
        //   console.log(apiResult.errors)
        //   apiResult.errors.map((err2: object) => {
        //     this.error2 = JSON.parse(JSON.stringify(err2))
        //     console.log(this.error2);
        //   })
        // }
        else {
          console.log(apiResult.errors);
          apiResult.errors.map((err: object) => {
            this.error = JSON.parse(JSON.stringify(err));
            console.log(this.error);
            // const errr = this.error.msg
            // console.log(typeof errr)
            // console.log(typeof (this.error));
            // console.log(this.error.param);
            // console.log(this.error['msg']);
            // this.toastr.error(error['msg'], "LOGIN", { timeOut: 5000 });
          })
        }
      });
  }

  onSave() {
    if (this.closebutton !== undefined) {

      this.closebutton.nativeElement.click()
    }
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
