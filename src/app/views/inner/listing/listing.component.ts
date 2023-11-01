import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { SharedService } from '../../../common/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent {
  constructor(
    public commonservice: CommonService,
    public sharedservice: SharedService,
    private router: ActivatedRoute
  ) { }

  list: any;
  flag: boolean = false;
  upcoming: boolean = false;
  error: any = "";

  ngOnInit() {
    this.getList();
    // this.sharedservice.isQuizLiveCheck()
  }

  async getList() {
    let param = '';

    if (this.router.snapshot.params['subtopic']) {
      param = this.router.snapshot.params['subtopic'];
    } else {
      param = this.router.snapshot.params['topic'];
    }

    await this.commonservice
      .get(`page/get-quiz-list/${param}`)
      .subscribe((res) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        console.log("apiResult>>>>>", apiResult)
        if (apiResult && apiResult.status == 'SUCCESS') {
          this.list = apiResult && apiResult.payload;
          this.flag = true;
          this.upcoming = false
          if (this.list.length == 0) {
            this.upcoming = true
          }
        } else {
          this.flag = false;
          this.error = "";
          this.upcoming = false;
        }
      });
  }


}
