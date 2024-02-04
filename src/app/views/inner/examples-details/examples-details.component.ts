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

  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private _router: Router
  ) {
    this.getslug = this.router.snapshot.params['slug'];
    console.log('SLUG>>>>>>>>>>', this.getslug);
  }

  ngOnInit() {
    this.getMenuSidebar();
    this.getBlogDetails();
  }

  async getMenuSidebar() {
    this.param = this.router.snapshot.params['topic'];
    console.log(this.param);
  }

  async getBlogDetails() {
    this.blogDetails = {};
    this.relatedBlogList = [];
    await this.commonservice
      .get(`page/blog/inner/${this.getslug}`)
      .subscribe((res: any) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        console.log(apiResult);
        const totalBlogDetails = apiResult.payload;

        if (apiResult && apiResult.status == 'SUCCESS') {
          this.blogDetails = apiResult && totalBlogDetails.blogDetails;
          this.relatedBlogList = apiResult && totalBlogDetails.relatedBlogList;
          console.log('this.blogDetails>>>>', this.blogDetails);
          console.log('this.relatedBlogList>>>>>>', this.relatedBlogList);
          this.blogMenuList = [];
          this.relatedBlogList.map((data: any) => {
            // if (data.sort_slug != this.getslug) {
            this.blogMenuList.push({
              active: this.getslug === data.sort_slug ? true : false,
              ...data,
            });
            // }
          });
          console.log(this.blogMenuList);
        }
      });
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  navigate(slug: String) {
    // this._router.navigate([`examples/${this.param}/${slug}`]);
    // this.ngOnInit();
    window.location.href = `examples/${this.param}/${slug}`;
  }
}
