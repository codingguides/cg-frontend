import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent {
  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute
  ) { }

  menu_sidebar: any;

  ngOnInit() {
    this.getMenuSidebar();
  }
  async getMenuSidebar() {
    await this.commonservice
      .get(`page/get-quiz-list/${this.router.snapshot.params['topic']}`)
      .subscribe((result) => {
        const apiResult2 = JSON.parse(JSON.stringify(result));

        if (apiResult2 && apiResult2.status == 'SUCCESS') {
          this.menu_sidebar = apiResult2 && apiResult2.payload;
        }
      });
  }

}
