import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CommonService } from './common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Codingguides';
  quizInterruptStatus: any;
  quizStatus: any;
  quizCurrentUrl: any;

  constructor(private route: Router, private service: CommonService) { }


  ngOnInit() {

    this.service.getQuizStatus()
    this.quizInterruptStatus = this.service.castQuizStatus.subscribe((obj: any) => {
      console.log(obj.status, "aaaaa", obj.currentUrl, "bbbbbbb", obj.userId)
      // return obj;
      this.quizStatus = obj.status;
      this.quizCurrentUrl = obj.currentUrl;
    })
    console.log("ressssssssssssssss", this.quizInterruptStatus);
    this.route.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // console.clear();
        if (this.quizInterruptStatus.status) {
          console.log("this.quizInterruptStatus.status", this.quizInterruptStatus.status)
          if (this.quizInterruptStatus.currentUrl == event.url) {
            alert("did you want to exit this page suerly!")
          }
        }
        console.log(event.url)
      }
    })

  }
}

