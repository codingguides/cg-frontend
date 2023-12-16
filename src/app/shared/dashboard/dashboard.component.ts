import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
  text: string = '';
  image: any = '/assets/images/profile-icon-9.png';

  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder,
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

    this.formGroup2 = this.formBuilder.group({
      oldpassword: new FormControl(''),
      newpassword: new FormControl(''),
      confirmpassword: new FormControl(''),
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
    return this.formGroup.get('oldpassword');
  }
  get newpassword() {
    return this.formGroup.get('newpassword');
  }
  get confirmpassword() {
    return this.formGroup.get('confirmpassword');
  }

  ngOnInit(): void {
    this.commonservice.castLogin.subscribe((result) => {
      this.obj = JSON.parse(JSON.stringify(result));
      this.name = this.obj.username;
      this._id = this.obj.user_id;
      this.token = this.obj.token;
      this.status = this.obj.status;
      this.showWarning = false;
      console.log('Token in ngOnInit', this.token);
      console.log('ID>>>>>>>>', this._id);
    });

    this.historyUserData({
      page: this.page,
      limit: this.limit,
    });
  }

  historyUserData(params: object) {
    // if (this.token) {
    //   this.userLogin = true;
    //   console.log('TOKENNNNNNNN>>>>>', this.token);

    this.commonservice
      .put(params, `topic/user-analytics/${this._id}`)
      .subscribe((result: any) => {
        if (result && result.status == 'SUCCESS') {
          this.userDetailsByID = result && result.payload;
          console.log('USER DATA>>>>>>', this.userDetailsByID);
          this.userDetailsByID.map((data: any) => {
            this.statusDetails = data.status;
            this.url = data.topic_url;
            console.log('URL>>>>>>>>', this.statusDetails);
          });
        }
      });
    // }
  }

  profileUserData() {
    // if (this.token) {
    // this.userLogin = true;
    // console.log("TOKENNNNNNNN>>>>>", this.token);

    this.commonservice
      .get(`profile/get/${this._id}`)
      .subscribe((result: any) => {
        if (result && result.status == 'SUCCESS') {
          this.userProfileDetailsByID = result && result.payload;
          console.log('USER PROFILE DATA>>>>>>', this.userProfileDetailsByID);
          console.log('FULL NAME>>>>', this.userProfileDetailsByID.name);
          console.log('PASSWORD', this.userProfileDetailsByID.password);
          const fullName = this.userProfileDetailsByID.name;
          this.firstName = fullName.split(' ').slice(0, -1).join(' ');
          this.lastName = fullName.split(' ').slice(-1).join(' ');
          console.log('FIRST NAME>>>>', this.firstName);
          console.log('LAST NAME>>>>', typeof this.lastName);
          this.totalName = this.firstName + ' ' + this.lastName;
          console.log('NAME<<<<<<', this.totalName);
          console.log('PICTURE<<<<<<', this.userProfileDetailsByID.profile_pic);

          // this.image = this.userProfileDetailsByID.profile_pic;

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
    // this.totalName = this.formGroup.value.first_name + " " + this.formGroup.value.last_name;
    const data = {
      name:
        this.formGroup.value.first_name + ' ' + this.formGroup.value.last_name,
      organization: this.formGroup.value.organization,
      location: this.formGroup.value.location,
      email: this.formGroup.value.email,
      phone: this.formGroup.value.phone,
      birthday: this.formGroup.value.birthday,
      profile_pic: this.image,
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
          this.commonservice.setLoggedIn(true, this.name, this._id, token);
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
      if (details.oldpassword === details.newpassword) {
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

  one(event: Event) {
    const eventTarget: Element = event.target as Element;
    console.log("eventTarget>>>>>>>>>",eventTarget)
    // const elementId: string = eventTarget.id;
    // const attribVal: any = eventTarget.attributes['src'].nodeValue;
    console.log('<<<<<<<<<<<<<<,test>>>>>>>>>>>>>')
    this.image = '/assets/images/avatar7.png';
    $('.title-text').hide();
    this.text = 'First picture Selected.';
  }
  two(val:any) {
    console.log("val>>>>>>>>>>",val)
    console.log(val.replace('http://localhost:4200', ''))
    this.image = val.replace('http://localhost:4200', '');
    $('.title-text').hide();
    $('.fa-spinner').show();
    //api call
    $('.fa-spinner').hide();
    this.text = 'Second picture Selected.';
  }
  three() {
    this.image = '/assets/images/avatar6.png';
    $('.title-text').hide();
    this.text = 'Third picture Selected.';
  }
  four() {
    this.image = '/assets/images/avatar8.png';
    $('.title-text').hide();
    this.text = 'Fourth picture Selected.';
  }
}
