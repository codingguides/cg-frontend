import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';

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

  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      organization: new FormControl(''),
      location: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      birthday: new FormControl(''),

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
          const fullName = this.userProfileDetailsByID.name;
          this.firstName = fullName.split(' ').slice(0, -1).join(' ');
          this.lastName = fullName.split(' ').slice(-1).join(' ');
          console.log('FIRST NAME>>>>', this.firstName);
          console.log('LAST NAME>>>>', typeof (this.lastName));
          this.totalName = this.firstName + " " + this.lastName;
          console.log("NAME<<<<<<", this.totalName);


          this.formGroup = this.formBuilder.group({
            first_name: new FormControl(fullName.split(' ').slice(0, -1).join(' ')),
            last_name: new FormControl(fullName.split(' ').slice(-1).join(' ')),

            organization: new FormControl(this.userProfileDetailsByID.organization),
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
      name: this.formGroup.value.first_name + " " + this.formGroup.value.last_name,
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

          let token = apiResult?.token;
          let payload = apiResult?.payload;
          this.name = payload.name.split(' ').map((n: any) => n[0]).join('');

          this.formGroup = this.formBuilder.group({
            first_name: new FormControl(payload.name.split(' ').slice(0, -1).join(' ')),
            last_name: new FormControl(payload.name.split(' ').slice(-1).join(' ')),
            organization: new FormControl(payload.organization),
            location: new FormControl(payload.location),
            email: new FormControl(payload.email),
            phone: new FormControl(payload.phone),
            birthday: new FormControl(payload.birthday),
          });
          console.log("API RESULT Payload", apiResult.payload);
          console.log("API RESULT Token", apiResult.token);

          localStorage.setItem("accessToken", token);
          sessionStorage.setItem("accessToken", token);
          this.commonservice.setLoggedIn(true, this.name, this._id, token);
          this.ngOnInit();
        }
      })
  }
}
