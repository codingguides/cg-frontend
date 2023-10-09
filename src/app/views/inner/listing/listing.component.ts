import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent {

  constructor(public commonservice: CommonService, private router: ActivatedRoute) { }

  list: any

  ngOnInit() {
    this.getList();
  }

  async getList() {
    console.log("11111", this.router.snapshot);
    console.log("2222", this.router);
    console.log("3333", this.router.snapshot.params);
    console.log("3333", this.router.snapshot.params['length']);
    let param = '';
    // let url = '';

    if (this.router.snapshot.params['subtopic']) {
      param = this.router.snapshot.params['subtopic'];
    } else {
      param = this.router.snapshot.params['topic'];
    }

    await this.commonservice.get(`page/get-quiz-list/${param}`)
      .subscribe((res) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        console.log(apiResult.payload);
        if (apiResult && apiResult.status == 'SUCCESS') {
          this.list = apiResult && apiResult.payload;
        }
      })
  }

}
