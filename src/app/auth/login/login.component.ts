import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  errr: string = '';
  error2: any;
  name: any;
  _id: any;
  visible: boolean = true;
  changetype: boolean = true;
  openModal: boolean = true;
  modalClass = 'modal';
  profile_pic: any;

  constructor(
    private _route: Router,
    private http: HttpClient,
    public commonservice: CommonService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.login = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: [''],
    });
  }
  ngOnInit(): void {}

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
          loginType: 'normal',
        },
        'user/login'
      )
      .subscribe((res) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        console.log(apiResult);

        if (apiResult['result'] == 'ok') {
          if (apiResult && apiResult['data']['payload']) {
            localStorage.clear();

            console.log(apiResult && apiResult['data']['token']);
            console.log(apiResult && apiResult['data']['payload']);

            localStorage.setItem(
              'accessToken',
              apiResult && apiResult['data']['token']
            );
            sessionStorage.setItem(
              'accessToken',
              apiResult && apiResult['data']['token']
            );
            this.name =
              apiResult &&
              apiResult['data']['payload'].name
                .split(' ')
                .map((n: any) => n[0])
                .join('');
            this._id = apiResult && apiResult['data']['payload'].id;
            this.profile_pic =
              apiResult && apiResult['data']['payload']?.profile_pic;
            console.log(this.name);
            console.log(this._id);
            let token = apiResult && apiResult['data']['token'];
            this.commonservice.setLoggedIn(
              true,
              this.name,
              this._id,
              token,
              this.profile_pic
            );
          }
          window.location.reload();
          this.login.reset();
          $('#myModal').hide();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sign In Successful',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          console.log(apiResult.errors);
          apiResult.errors.map((err: object) => {
            this.error = JSON.parse(JSON.stringify(err));
            console.log(this.error);
          });
        }
      });
  }

  onSave() {
    if (this.closebutton !== undefined) {
      this.closebutton.nativeElement.click();
    }
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  onClick(val: boolean) {
    this.modalClass = 'modal show';
    this.openModal = !val;

    console.log('VAL2>>>>>', this.openModal);
  }

  closeModal() {
    this.modalClass = 'modal hide';
    this.openModal = true;
  }
}
