import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menu: any
  showLogin: boolean = true;
  showLoginText: String = "Don't have an account? Sign Up";
  loginTrue: any //= localStorage.getItem('accessToken')
  status: boolean = false;
  username: string = "";
  modalClass = "modal";
  name: string = "";
  dropdownStatus: boolean = false;
  dropdownClass: string = 'dropdown-menu';


  constructor(public commonservice: CommonService, private router: Router) {

  }

  ngOnInit() {
    this.getMenu();
    this.commonservice.getLoggedIn()


    if (localStorage.getItem('accessToken')) {
      this.name = this.commonservice.getTokenDetails('name').split(' ').map((n: any) => n[0]).join('');
      this.commonservice.setLoggedIn(true, this.name);
    } else {
      this.commonservice.setLoggedIn(false, this.name)
    }

    this.loginTrue = this.commonservice.castLogin.subscribe((obj: any) => {
      this.status = obj.status
      this.name = obj.username
    });
    console.log(this.loginTrue.status)
    console.log(this.loginTrue.name)
    console.log(this.status, "<<<<<<<<<<<loginTrue>>>>>>>>>>>", this.loginTrue)
  }

  async getMenu() {
    await this.commonservice.get('page/get-menu').subscribe((res) => {
      const apiResult = JSON.parse(JSON.stringify(res));
      console.log(apiResult.payload);
      if (apiResult && apiResult.status == 'SUCCESS') {
        this.menu = apiResult && apiResult.payload;
      }
    })
  }

  openModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block'
    }
  }

  // closeModal() {
  //   const modalDiv = document.getElementById('myModal');
  //   if (modalDiv != null) {
  //     modalDiv.style.display = 'none'
  //   }
  // }

  // changeLogin(val: boolean) {
  //   this.showLogin = !val;
  //   if (val == true) {
  //     this.showLoginText = "Already have an account? Sign In";
  //   } else {
  //     this.showLoginText = "Don't have an account? Sign Up";
  //   }
  // }

  show() {
    this.dropdownStatus = !this.dropdownStatus;

    if (this.dropdownStatus == true) {
      this.dropdownClass = 'dropdown-menu show';
    }
    else {
      this.dropdownClass = 'dropdown-menu';
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
    this.ngOnInit();
  }

}
