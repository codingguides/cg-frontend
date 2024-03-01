import { Component } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { CommonService } from 'src/app/common/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  modalClass = 'modal';
  showLogin: boolean = true;
  showLoginText: String = "Don't have an account? Sign Up";
  user: any;
  loggedIn: any;
  name: any;
  _id: any;
  error: any;
  signupName: any;
  signup_id: any;
  googleText: String = 'signin_with';
  profile_pic: any;

  constructor(
    private authService: SocialAuthService,
    public commonservice: CommonService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
      console.log(this.user.email);
      console.log(this.user.photoUrl);
      // console.log(this.user.email);
      console.log(this.loggedIn);
      this.googleLogin();
    });
  }

  async googleLogin() {
    const email = this.user.email;
    console.log(email);
    await this.commonservice
      .post({ email: email }, 'user/social-login')
      .subscribe((res) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        console.log(apiResult);
        console.log(apiResult.nextcall);
        if (apiResult.nextcall == 'signin') {
          this.commonservice
            .login(
              {
                email: email,
                loginType: 'google',
              },
              'user/login'
            )
            .subscribe((result) => {
              const apiResponse = JSON.parse(JSON.stringify(result));
              console.log(apiResponse);
              console.log(apiResponse['data']['payload']);

              if (apiResponse['result'] == 'ok') {
                if (apiResponse && apiResponse['data']['payload']) {
                  localStorage.clear();

                  console.log(apiResponse && apiResponse['data']['token']);
                  console.log(apiResponse && apiResponse['data']['payload']);

                  localStorage.setItem(
                    'accessToken',
                    apiResponse && apiResponse['data']['token']
                  );
                  sessionStorage.setItem(
                    'accessToken',
                    apiResponse && apiResponse['data']['token']
                  );
                  this.name =
                    apiResponse &&
                    apiResponse['data']['payload'].name
                      .split(' ')
                      .map((n: any) => n[0])
                      .join('');
                  this._id = apiResponse && apiResponse['data']['payload'].id;
                  this.profile_pic =
                    apiResponse && apiResponse['data']['payload']?.profile_pic;

                  console.log(this.name);
                  console.log(this._id);
                  let signinToken = apiResponse && apiResponse['data']['token'];
                  this.commonservice.setLoggedIn(
                    true,
                    this.name,
                    this._id,
                    signinToken,
                    this.profile_pic
                  );
                }
                window.location.reload();
                $('#myModal').hide();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Sign In Successful',
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                console.log(apiResponse.errors);
                apiResponse.errors.map((err: object) => {
                  this.error = JSON.parse(JSON.stringify(err));
                  console.log(this.error);
                });
              }
            });
        } else if (apiResult.nextcall == 'signup') {
          const name = this.user.name;
          const email = this.user.email;
          const profile_pic = this.user.photoUrl;
          this.commonservice
            .post(
              {
                name: name,
                email: email,
                profile_pic: profile_pic,
                loginType: 'google',
              },
              'user/signup'
            )
            .subscribe((response) => {
              const apiFeedback = JSON.parse(JSON.stringify(response));
              console.log(apiFeedback);
              console.log(apiFeedback['data']['payload']);

              if (apiFeedback['result'] == 'error') {
                alert('Something Error! Please try again.'); // Add swal here for showing error

                // apiFeedback.errors.map((err: object) => {
                //   this.error = JSON.parse(JSON.stringify(err));
                //   console.log(this.error);
                //   console.log(this.error['msg']);
                // });
              } else {
                if (apiFeedback['result'] == 'ok') {
                  if (apiFeedback && apiFeedback['data']['payload']) {
                    localStorage.clear();

                    console.log(apiFeedback && apiFeedback['data']['token']);
                    console.log(apiFeedback && apiFeedback['data']['payload']);

                    localStorage.setItem(
                      'accessToken',
                      apiFeedback && apiFeedback['data']['token']
                    );
                    sessionStorage.setItem(
                      'accessToken',
                      apiFeedback && apiFeedback['data']['token']
                    );

                    this.signupName =
                      apiFeedback &&
                      apiFeedback['data']['payload'].name
                        .split(' ')
                        .map((n: any) => n[0])
                        .join('');
                    this.signup_id =
                      apiFeedback && apiFeedback['data']['payload'].id;
                    this.profile_pic =
                      apiFeedback &&
                      apiFeedback['data']['payload']?.profile_pic;
                    console.log(this.signupName);
                    console.log(this.signup_id);
                    let signupToken =
                      apiFeedback && apiFeedback['data']['token'];
                    this.commonservice.setLoggedIn(
                      true,
                      this.signupName,
                      this.signup_id,
                      signupToken,
                      this.profile_pic
                    );
                  }
                  window.location.reload();
                  $('#myModal').hide();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Sign In Successful',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }
            });
        }
      });
  }

  closeModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'none';
      localStorage.setItem('notInterested', 'yes');
    }
  }

  changeLogin(val: boolean) {
    this.showLogin = !val;
    if (val == true) {
      this.showLoginText = 'Already have an account? Sign In';
      this.googleText = 'signup_with';
      console.log(this.googleText);
    } else {
      this.showLoginText = "Don't have an account? Sign Up";
      this.googleText = 'signin_with';
      console.log(this.googleText);
    }
  }
}
