import { Component } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { CommonService } from 'src/app/common/common.service';

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

  constructor(
    private authService: SocialAuthService,
    public commonservice: CommonService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(this.user);
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
        if (apiResult.nextcall == 'signup') {
        } else if (apiResult.nextcall == 'signin') {
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
    } else {
      this.showLoginText = "Don't have an account? Sign Up";
    }
  }
}
