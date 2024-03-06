import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/common/common.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  obj: any;
  name: any;
  _id: string = '';
  token: any = '';
  status: boolean = false;
  showWarning: boolean = false;
  userLogin: boolean = false;
  getId: string = '';
  userDetailsByID: any = [];
  url: string = '';
  statusDetails: string = '';
  page: number = 1;
  totalLength: any;
  limit: number = 1000;
  userProfileDetailsByID: any = [];
  firstName: string = '';
  lastName: string = '';
  formGroup!: FormGroup;
  totalName: string = '';
  formGroup2!: FormGroup;
  successMessage: string = '';
  errMessage: string = '';
  errFlag: any = false;
  result: any;
  visible1: boolean = true;
  changetype1: boolean = true;
  visible2: boolean = true;
  changetype2: boolean = true;
  visible3: boolean = true;
  changetype3: boolean = true;
  message: string = '';
  text: string = ' Profile Picture Selected';
  image: any = '/assets/images/profile-icon-9.png';
  profile_pic: string = '';

  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
    private formBuilder2: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formGroup = this.formBuilder.group({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      organization: new FormControl(''),
      location: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      birthday: new FormControl(''),
      password: new FormControl(''),
    });

    this.formGroup2 = this.formBuilder2.group({
      oldpassword: new FormControl('', [Validators.required]),
      newpassword: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
    });
  }

  get first_name() {
    return this.formGroup.get('first_name');
  }
  get last_name() {
    return this.formGroup.get('last_name');
  }
  get organization() {
    return this.formGroup.get('organization');
  }
  get location() {
    return this.formGroup.get('location');
  }
  get email() {
    return this.formGroup.get('email');
  }
  get phone() {
    return this.formGroup.get('phone');
  }
  get birthday() {
    return this.formGroup.get('birthday');
  }
  get password() {
    return this.formGroup.get('password');
  }
  get oldpassword() {
    return this.formGroup2.get('oldpassword');
  }
  get newpassword() {
    return this.formGroup2.get('newpassword');
  }
  get confirmpassword() {
    return this.formGroup2.get('confirmpassword');
  }

  ngOnInit(): void {

    if (localStorage.getItem('accessToken')) {
      this.name = this.commonservice.getTokenDetails('name');
      this.name = this.name ? this.name.split(' ').map((n: any) => n[0]).join('') : "";
      this._id = this.commonservice.getTokenDetails('id');
      this.token = localStorage.getItem('accessToken')
      this.profile_pic = this.commonservice.getTokenDetails('profile_pic');
      this.commonservice.setLoggedIn(
        true,
        this.name,
        this._id,
        localStorage.getItem('accessToken'),
        this.profile_pic
      );
    }

    this.historyUserData({
      page: this.page,
      limit: this.limit,
    });
  }

  historyUserData(params: object) {
    this.commonservice
      .put(params, `topic/user-analytics/${this._id}`)
      .subscribe((result: any) => {
        if (result && result.status == 'SUCCESS') {
          this.userDetailsByID = result && result.payload;
          this.userDetailsByID.map((data: any) => {
            this.statusDetails = data.status;
            this.url = data.topic_url;
          });
        }
      });
  }

  profileUserData() {
    this.commonservice
      .get(`profile/get/${this._id}`)
      .subscribe((result: any) => {
        if (result && result.status == 'SUCCESS') {
          this.userProfileDetailsByID = result && result.payload;
          const fullName = this.userProfileDetailsByID.name;
          this.firstName = fullName.split(' ').slice(0, -1).join(' ');
          this.lastName = fullName.split(' ').slice(-1).join(' ');
          this.totalName = this.firstName + ' ' + this.lastName;
          this.image = this.userProfileDetailsByID.profile_pic;
          if (this.image == this.userProfileDetailsByID.profile_pic) {
            $('.title-text').hide();
            $('.title-text2').show();
          }
          this.formGroup = this.formBuilder.group({
            first_name: new FormControl(
              fullName.split(' ').slice(0, -1).join(' ')
            ),
            last_name: new FormControl(fullName.split(' ').slice(-1).join(' ')),

            organization: new FormControl(
              this.userProfileDetailsByID.organization
            ),
            location: new FormControl(this.userProfileDetailsByID.location),
            email: new FormControl(this.userProfileDetailsByID.email),
            phone: new FormControl(this.userProfileDetailsByID.phone),
            birthday: new FormControl(this.userProfileDetailsByID.birthday),
          });
        }
      });
  }

  tryAgain() {
    this._router.navigate([this.url]);
  }

  onSubmit(formData: any) {
    const data = {
      name:
        this.formGroup.value.first_name + ' ' + this.formGroup.value.last_name,
      organization: this.formGroup.value.organization,
      location: this.formGroup.value.location,
      email: this.formGroup.value.email,
      phone: this.formGroup.value.phone,
      birthday: this.formGroup.value.birthday,
    };
    console.log('data<<<<<<<<', data);

    this.commonservice
      .put(data, `profile/update/${this._id}`)
      .subscribe((result: any) => {
        const apiResult = JSON.parse(JSON.stringify(result));

        if (apiResult && apiResult.status == 'SUCCESS') {
          this.message = apiResult.msg;
          console.log('MESSAGE???????????', this.message);
          let token = apiResult?.token;
          let payload = apiResult?.payload;
          this.name = payload.name
            .split(' ')
            .map((n: any) => n[0])
            .join('');
          this.profile_pic = payload.profile_pic;
          this.formGroup = this.formBuilder.group({
            first_name: new FormControl(
              payload.name.split(' ').slice(0, -1).join(' ')
            ),
            last_name: new FormControl(
              payload.name.split(' ').slice(-1).join(' ')
            ),
            organization: new FormControl(payload.organization),
            location: new FormControl(payload.location),
            email: new FormControl(payload.email),
            phone: new FormControl(payload.phone),
            birthday: new FormControl(payload.birthday),
          });
          console.log('API RESULT Payload', apiResult.payload);
          console.log('API RESULT Token', apiResult.token);

          localStorage.setItem('accessToken', token);
          sessionStorage.setItem('accessToken', token);
          this.commonservice.setLoggedIn(
            true,
            this.name,
            this._id,
            token,
            this.profile_pic
          );
          this.ngOnInit();
        }
      });
  }

  onSubmitData(formData: any) {
    const details = {
      oldpassword: this.formGroup2.value.oldpassword,
      newpassword: this.formGroup2.value.newpassword,
      confirmpassword: this.formGroup2.value.confirmpassword,
    };
    console.log('DETAILS<<<<<<', details);
    if (details.newpassword === details.confirmpassword) {
      console.log('MATCHED....');
      if (
        details.oldpassword == '' ||
        details.newpassword == '' ||
        details.confirmpassword == ''
      ) {
        console.log('DATA NOT FILLED');
        this.errMessage = 'Data not completely filled!';
      } else if (details.oldpassword === details.newpassword) {
        this.errMessage = "Can't repeat old password!";
      } else {
        this.commonservice
          .put(details, `profile/update-password/${this._id}`)
          .subscribe(
            (res: any) => {
              this.result = JSON.parse(JSON.stringify(res));
              if (this.result && this.result.status == 'SUCCESS') {
                $('.error-msg').hide();
                this.successMessage = this.result.msg;
                this.formGroup2.reset();
              }
            },
            (error) => {
              this.errMessage = error.error.msg;
              console.log(this.errMessage);
            }
          );
      }
    } else {
      this.errMessage = 'New & Confirm both password not match!';
    }
  }

  viewpass1() {
    this.visible1 = !this.visible1;
    this.changetype1 = !this.changetype1;
  }

  viewpass2() {
    this.visible2 = !this.visible2;
    this.changetype2 = !this.changetype2;
  }

  viewpass3() {
    this.visible3 = !this.visible3;
    this.changetype3 = !this.changetype3;
  }

  pictureSelect(val: any) {
    let host = `${window.location.protocol}//${window.location.host}`
    this.image = val.replace(host, '');
    $('.title-text').hide();
    $('.title-text2').hide();
    $('#spinner').show();

    const details = { profile_pic: this.image };
    this.commonservice
      .put(details, `profile/update/${this._id}`)
      .subscribe((res: any) => {
        const result = JSON.parse(JSON.stringify(res));
        console.log(result.status);
        if (result && result.status == 'SUCCESS') {
          let payload = result?.payload;
          let token = result?.token;
          console.log(payload);
          this.name = payload.name
            .split(' ')
            .map((n: any) => n[0])
            .join('');
          this._id = payload._id;
          this.profile_pic = payload.profile_pic;
          // alert(this.profile_pic)
          localStorage.setItem('accessToken', token);
          sessionStorage.setItem('accessToken', token);
          this.commonservice.setLoggedIn(
            true,
            this.name,
            this._id,
            token,
            this.profile_pic
          );
        }

        setTimeout(function () {
          $('#spinner').hide();
        }, 300);

        setTimeout(function () {
          $('.text').show();
        }, 300);

        setTimeout(function () {
          $('.text').hide();
        }, 1500);
      });
  }
}
