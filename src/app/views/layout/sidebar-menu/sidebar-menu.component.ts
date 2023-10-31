import { Component, HostListener } from '@angular/core';
import { CommonService } from '../../../common/common.service';
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
    if (this.quizStatus == false) {

      if (parentpath == this.param) {
        window.location.href = 'quiz/' + parentpath + '/' + path
      } else {
        window.location.href = 'quiz/' + this.param + '/' + parentpath + '/' + path
      }
    } else {


      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: true,
      });

      swalWithBootstrapButtons
        .fire({
          title: 'Are you sure?',
          text: "You want to exit to this page surely!!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, exit it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log("ERRORRRRR")
          }
        })


      console.log(this.quizCurrentUrl)
      console.log(this.routerurl.url)
      if (this.quizCurrentUrl !== this.routerurl.url) {
        alert("ERorrrrrrrrrrrrrrr")
      }
    }


  }

  apitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
