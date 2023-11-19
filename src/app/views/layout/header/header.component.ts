import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../common/shared.service';


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
  href: string = "";

  constructor(
    public sharedService: SharedService,
    public commonservice: CommonService,
    private router: Router,
    private activerouter: ActivatedRoute
  ) {

  }

  searchvalue: string = ""

  ngOnInit() {
    this.getMenu();
    this.commonservice.getLoggedIn();


    this.href = this.router.url;
    if (this.findWord(this.href)) {
      this.searchvalue = this.activerouter.snapshot.params['topic'];
      alert(this.searchvalue)
    } else {
      this.searchvalue = "";
    }

    if (localStorage.getItem('accessToken')) {
      this.name = this.commonservice.getTokenDetails('name').split(' ').map((n: any) => n[0]).join('');
      console.log("this.name>>>>>>", this.name)

      let id = this.commonservice.getTokenDetails('id');
      this.commonservice.setLoggedIn(true, this.name, id, localStorage.getItem('accessToken'));
    } else {
      this.commonservice.setLoggedIn(false, this.name, '', '')
    }

    this.loginTrue = this.commonservice.castLogin.subscribe((obj: any) => {
      this.status = obj.status
      this.name = obj.username
    });
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

  findWord(str: string) {
    let word = "search"
    return RegExp('\\b' + word + '\\b').test(str)
  }


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

  renderUrl(link: any) {
    this.sharedService.isQuizLiveCheck(`quiz/${link}`, true);
  }

  searchDate(val: String) {
    this.sharedService.isQuizLiveCheck(`search/${val}`, true);
  }
}
