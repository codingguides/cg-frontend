import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../common/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menu: any;
  showLogin: boolean = true;
  showLoginText: String = "Don't have an account? Sign Up";
  loginTrue: any; //= localStorage.getItem('accessToken')
  status: boolean = false;
  username: string = '';
  modalClass = 'modal';
  name: string = '';
  dropdownStatus: boolean = false;
  dropdownClass: string = 'dropdown-menu';
  href: string = '';

  mflag: any = true;
  profile_pic: string = '';
  picture: string = '';

  constructor(
    public sharedService: SharedService,
    public commonservice: CommonService,
    private router: Router,
    private activerouter: ActivatedRoute
  ) {}

  searchvalue: string = '';
  activeLocalhost: boolean = true;

  ngOnInit() {
    if (
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1'
    ) {
      this.activeLocalhost = false;
      this.mflag = false;
    }

    this.getMenu();
    this.commonservice.getLoggedIn();
    this.href = this.router.url;
    console.log('this.href>>>>>>>>>>>>', this.href);
    if (this.findWord(this.href)) {
      this.searchvalue = this.activerouter.snapshot.params['topic'];
    } else {
      this.searchvalue = '';
    }
    console.log('this.searchvalue>>>>>>>>>>>>', this.searchvalue);

    if (localStorage.getItem('accessToken')) {
      this.name = this.commonservice
        .getTokenDetails('name')
        .split(' ')
        .map((n: any) => n[0])
        .join('');
      console.log('this.name>>>>>>', this.name);

      let id = this.commonservice.getTokenDetails('id');
      this.profile_pic = this.commonservice.getTokenDetails('profile_pic');
      console.log(this.profile_pic);
      console.log(typeof this.profile_pic);
      this.commonservice.setLoggedIn(
        true,
        this.name,
        id,
        localStorage.getItem('accessToken'),
        this.profile_pic
      );
    } else {
      this.commonservice.setLoggedIn(
        false,
        this.name,
        '',
        '',
        this.profile_pic
      );
    }

    this.loginTrue = this.commonservice.castLogin.subscribe((obj: any) => {
      this.status = obj.status;
      this.name = obj.username;
      this.profile_pic = obj.profile_pic;
    });
  }

  onKeyUp(event: any) {
    if (event.target.value == 'Code24') {
      this.mflag = false;
    }
  }

  async getMenu() {
    await this.commonservice.get('page/get-menu').subscribe((res) => {
      const apiResult = JSON.parse(JSON.stringify(res));
      console.log(apiResult.payload);
      if (apiResult && apiResult.status == 'SUCCESS') {
        this.menu = apiResult && apiResult.payload;
      }
    });
  }

  openModal() {
    const modalDiv = document.getElementById('myModal');
    if (modalDiv != null) {
      modalDiv.style.display = 'block';
    }
  }

  findWord(str: string) {
    let word = 'search';
    return RegExp('\\b' + word + '\\b').test(str);
  }

  show() {
    this.dropdownStatus = !this.dropdownStatus;

    if (this.dropdownStatus == true) {
      this.dropdownClass = 'dropdown-menu show';
    } else {
      this.dropdownClass = 'dropdown-menu';
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
    this.ngOnInit();
  }

  dashboard() {
    this.router.navigate(['dashboard']);
  }

  renderUrl(link: any) {
    this.sharedService.isQuizLiveCheck(`quiz/${link}`, true);
  }

  searchDate(val: String) {
    this.sharedService.isQuizLiveCheck(`search/${val}`, true);
  }
}
