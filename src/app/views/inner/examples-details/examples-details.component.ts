import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-examples-details',
  templateUrl: './examples-details.component.html',
  styleUrls: ['./examples-details.component.css'],
})
export class ExamplesDetailsComponent {
  getslug: string = '';
  param: any;
  blogDetails: any = {};
  relatedBlogList: [] = [];
  blogMenuList: any = [];
  activeAll: boolean = true;
  details: any;
  activeTopic: any = 'All';
  tempArr: any = [];
  newArr: any = [];

  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private _router: Router
  ) {
    this.getslug = this.router.snapshot.params['slug'];
  }

  ngOnInit() {
    this.getMenuSidebar();
    this.getBlogDetails();
  }

  async getMenuSidebar() {
    this.param = this.router.snapshot.params['topic'];
  }

  async getBlogDetails() {
    this.blogDetails = {};
    this.relatedBlogList = [];
    await this.commonservice
      .get(`page/blog/inner/${this.getslug}`)
      .subscribe((res: any) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        const totalBlogDetails = apiResult.payload;

        if (apiResult && apiResult.status == 'SUCCESS') {
          this.blogDetails = apiResult && totalBlogDetails.blogDetails;
          this.relatedBlogList = apiResult && totalBlogDetails.relatedBlogList;

          this.blogMenuList = [];
          this.relatedBlogList.map((data: any) => {
            this.blogMenuList.push({
              active: this.getslug === data.sort_slug ? true : false,
              ...data,
            });
          });

          var i = 0;
          this.blogMenuList.map((data: any) => {
            i++;
            if (i < 5) {
              this.tempArr.push(data);

              if (i == 4) {
                this.newArr.push(this.tempArr);
                this.tempArr = [];
                i = 0;
              }
            }
          });
        }
      });
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  navigate(slug: String) {
    window.location.href = `examples/${this.param}/${slug}`;
  }
}
