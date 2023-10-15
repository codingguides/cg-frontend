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
    private router: ActivatedRoute,
    private routerurl: Router
  ) { }

  menu_sidebar: any;
  param: any;

  ngOnInit() {
    this.getMenuSidebar();
  }
  async getMenuSidebar() {

    this.param = this.router.snapshot.params['topic'];

    await this.commonservice
      .get(`page/get-sidebar-menu`)
      .subscribe((result) => {
        const apiResult2 = JSON.parse(JSON.stringify(result));

        if (apiResult2 && apiResult2.status == 'SUCCESS') {
          this.menu_sidebar = apiResult2 && apiResult2.payload.find((menu:any)=> menu.slug == this.param);
          this.menu_sidebar = this.menu_sidebar.children;
        }
      });
  }
  navigate(path:string){
    this.routerurl.navigate(['quiz',this.param, path])
  }
}
