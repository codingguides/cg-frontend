import { Component } from '@angular/core';
import { CommonService } from '../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-slider-latest-posts',
  templateUrl: './slider-latest-posts.component.html',
  styleUrls: ['./slider-latest-posts.component.css']
})
export class SliderLatestPostsComponent {

  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private routerurl: Router
  ) {
    this.getBlog();
  }

  blog: any;
  showBlog:boolean = false;

  // ngOnInit() {
  //   this.getBlog();
  // }

  async getBlog() {
    await this.commonservice
      .get(`page/blog`)
      .subscribe((result) => {
        const apiResult = JSON.parse(JSON.stringify(result));
        if (apiResult && apiResult.status == 'SUCCESS') {
          this.blog = apiResult && apiResult.payload;
          console.log("this.blog>>>>>>>>>>",this.blog)
          this.showBlog = true;
        }else{
          this.showBlog = false;
        }
      });
  }

}
