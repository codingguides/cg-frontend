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
  subparam: any;
  selectedquiz: any;

  ngOnInit() {
    this.getMenuSidebar();
  }
  async getMenuSidebar() {

    this.param = this.router.snapshot.params['topic'];
    this.subparam = this.router.snapshot.params['subtopic'];
    this.selectedquiz = this.router.snapshot.params['quiz'];
    console.log("this.router.snapshot.params>>>>>>",this.router.snapshot.params)
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

  navigate(parentpath:string, path:string){
    if(parentpath == this.param){
      window.location.href = 'quiz/' + parentpath + '/' + path
    }else{
      window.location.href = 'quiz/'+ this.param + '/' + parentpath + '/' + path
    }
  }

  apitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
}
