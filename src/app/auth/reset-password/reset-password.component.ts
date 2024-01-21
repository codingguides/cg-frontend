import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  formgroup!: FormGroup;
  reset_password: FormGroup | any;
  getToken: any = '';
  _id: string = '';
  result: any;
  successMessage: string = '';
  errMessage: string = '';
  obj: any;
  token: any = '';
  visible1: boolean = true;
  changetype1: boolean = true;
  visible2: boolean = true;
  changetype2: boolean = true;
  status = true;
  cautionMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public commonservice: CommonService,
    private router: Router
  ) {
    this.reset_password = this.formBuilder.group({
      password: [''],
      confirmNewPassword: [''],
    });
  }

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   console.log(params);
    //   // alert(params);
    // });
    this.getToken = this.route.snapshot.params['token'];
    console.log(this.getToken);
    const decoded = atob(this.getToken);
    const parsed = JSON.parse(decoded);
    console.log(parsed);
    console.log(parsed.timestamp);
    let date = new Date();
    console.log(date);
    let hour = date.getHours() * 60;
    console.log(hour);
    let mint = date.getMinutes();
    console.log(mint);
    let timestamp = hour + mint;
    console.log(timestamp);

    if (timestamp - parsed.timestamp <= 15) {
      console.log('PASS');
      this.status = true;
    } else {
      console.log('FAIL');
      this.status = false;
      this.cautionMessage =
        'Reset Password link is invalid now. Please try again!';
    }
    this._id = parsed['id'];
    console.log(this._id);
  }

  get password() {
    return this.reset_password.get('password');
  }

  get confirmNewPassword() {
    return this.reset_password.get('confirmNewPassword');
  }

  async resetPasswordData(formData: any) {
    const details = {
      password: this.reset_password.value.password,
      confirmNewPassword: this.reset_password.value.confirmNewPassword,
    };
    console.log('DETAILS<<<<<<', details);

    if (details.password == '' && details.confirmNewPassword == '') {
      console.log('ONEEE>>>>>>>>');
      console.log('DATA NOT FILLED');
      $('.success-msg').hide();
      this.errMessage = 'Required new password and confirm new password!';
    } else if (details.password === details.confirmNewPassword) {
      console.log('TWOOO>>>>>>>');
      console.log('"Cannot be Blank"....');
      $('.success-msg').hide();
      $('.error-msg').show();
      this.errMessage = "Both Password fields can't be blank!";
      if (details.password && details.confirmNewPassword != '') {
        console.log('SURELY>>>>>.');
        this.commonservice
          .put(details, `user/reset-password/${this._id}`)
          .subscribe((res: any) => {
            this.result = JSON.parse(JSON.stringify(res));
            console.log('RESULT>>>>>>>>', this.result);
            if (this.result && this.result.success == true) {
              $('.error-msg').hide();
              $('.success-msg').show();

              this.successMessage = this.result.message;
              console.log(this.successMessage);
              this.reset_password.reset();
            }
            setTimeout(() => {
              const modal = document.getElementById('myModal');
              if (modal != null) {
                modal.style.display = 'block';
                this.router.navigate(['/']);
              }
            }, 3000);
          });
      }
    } else {
      console.log('THREE>>>>>>>>');
      console.log('NOT MATCHED');
      this.errMessage = 'Password and Confirm Password not matched!';
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
}
