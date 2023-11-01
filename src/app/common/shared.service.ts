import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class SharedService {


  constructor(private service: CommonService, private router: Router) { }
  quizInterruptStatus: any;
  quizStatus: any;
  quizCurrentUrl: any;

  isQuizLiveCheck(routerlink: any, reloadtrue: boolean) {
    this.service.getQuizStatus()
    this.quizInterruptStatus = this.service.castQuizStatus.subscribe((obj: any) => {
      this.quizStatus = obj.status;
      this.quizCurrentUrl = obj.currentUrl;
    })


    if (this.quizStatus == true) {
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
            this.service.setQuizStatus(false, "", "")
            if (reloadtrue) {
              window.location.href = routerlink
            } else {
              this.router.navigate([routerlink]);
            }
          }
        })
    } else {
      if (reloadtrue) {
        window.location.href = routerlink
      } else {
        this.router.navigate([routerlink]);
      }
    }
  }
}
