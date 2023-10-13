import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent {
  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute
  ) { }

  list: any;
  menu_sidebar: any;

  ngOnInit() {
    this.getList();
    this.getMenuSidebar();
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

        if (apiResult && apiResult.status == 'SUCCESS') {
          this.list = apiResult && apiResult.payload;
        }
      });
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
