import { Component, HostListener } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { SharedService } from '../../../common/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent {
  quizInterruptStatus: any;
  quizStatus: any;
  quizCurrentUrl: any;
  constructor(
    public commonservice: CommonService,
    public sharedService: SharedService,
    private router: ActivatedRoute,
    private routerurl: Router
  ) { }

  menu_sidebar: any;
  param: any;
  subparam: any;
  selectedquiz: any;

  ngOnInit() {
    this.getMenuSidebar();

    this.quizInterruptStatus = this.commonservice.castQuizStatus.subscribe((obj: any) => {
      console.log(obj.status, "aaaaa", obj.currentUrl, "bbbbbbb", obj.userId)
      this.quizStatus = obj.status;
      this.quizCurrentUrl = obj.currentUrl;
    })
  }
  async getMenuSidebar() {

    this.param = this.router.snapshot.params['topic'];
    this.subparam = this.router.snapshot.params['subtopic'];
    this.selectedquiz = this.router.snapshot.params['quiz'];
    console.log("this.router.snapshot.params>>>>>>", this.router.snapshot.params)
    await this.commonservice
      .get(`page/get-sidebar-menu`)
      .subscribe((result) => {
        const apiResult2 = JSON.parse(JSON.stringify(result));

        if (apiResult2 && apiResult2.status == 'SUCCESS') {
          this.menu_sidebar = apiResult2 && apiResult2.payload.find((menu: any) => menu.slug == this.param);
          this.menu_sidebar = this.menu_sidebar.children;
        }
      });
  }

  navigate(parentpath: string, path: string) {
    let url = '';
    if (parentpath == this.param) {
      url = 'quiz/' + parentpath + '/' + path
    } else {
      url = 'quiz/' + this.param + '/' + parentpath + '/' + path
    }

    this.sharedService.isQuizLiveCheck(url, true);
  }

  apitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
