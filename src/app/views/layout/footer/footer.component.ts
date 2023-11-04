import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { Router } from '@angular/router';
import { SharedService } from '../../../common/shared.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  menu: any
  firstNav: any[] = [];
  secondNav: any[] = [];

  constructor(public sharedService: SharedService, public commonservice: CommonService, private router: Router) { }

  ngOnInit() {
    this.getMenu();
  }

  async getMenu() {
    await this.commonservice.get('page/get-menu').subscribe((res) => {
      const apiResult = JSON.parse(JSON.stringify(res));
      console.log(apiResult.payload);
      if (apiResult && apiResult.status == 'SUCCESS') {
        this.menu = apiResult && apiResult.payload;
        this.menu.map((val: any, index: number) => {
          if (index < 4) {
            this.firstNav.push(val)
          } else if (index >= 4 && index < 10) {
            this.secondNav.push(val)
          }
        })
        // console.log(this.menu)
      }
    })
  }

  renderUrl(link: any) {
    this.sharedService.isQuizLiveCheck(`quiz/${link}`, true);
  }

  navigate(path: string) {
    this.sharedService.isQuizLiveCheck(path, true);
  }
}
