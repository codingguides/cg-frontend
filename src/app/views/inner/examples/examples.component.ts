import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css'],
})
export class ExamplesComponent {
  param: any;
  getslug: string = '';
  examplesHeader: any = {};
  examplesList: any = {};
  keys: any;
  examples: any;
  array: any = [];
  topicDetails: [] = [];
  leftBlogList: [] = [];
  allBlogList: any = [];
  activeAll: boolean = true;
  activeTopic: any = 'All';
  rightTopic: any = [];
  limitTo: any = 0;

  top: any = 0;
  end: any = 4;
  tempArr: any = [];
  relatedBlogList: any = [];
  menu: any;
  cazzArr: any = [];
  menuList: any = [];
  cazzArr2: any = [];

  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private _router: Router
  ) {
    this.getslug = this.router.snapshot.params['topic'];
  }

  ngOnInit() {
    this.getMenuSidebar();
    this.getExamples();
    this.getMenu();
  }

  async getMenuSidebar() {
    this.param = this.router.snapshot.params['topic'];
  }

  async getExamples() {
    await this.commonservice
      .get(`page/blog/${this.getslug}`)
      .subscribe((res: any) => {
        const apiResult = JSON.parse(JSON.stringify(res));

        const topicDetails = apiResult.payload;
        if (apiResult && apiResult.status == 'SUCCESS') {
          this.examplesHeader = apiResult && topicDetails.topic;

          this.topicDetails = apiResult && topicDetails.res;
          var i = 0;
          this.topicDetails.map((topic: any) => {
            this.rightTopic.push(topic && topic['sub_category']);
            topic &&
              topic['blogDetails'].map((blog: any) => {
                i++;
                if (i < 5) {
                  this.tempArr.push(blog);

                  if (i == 4) {
                    this.relatedBlogList.push(this.tempArr);

                    this.tempArr = [];
                    i = 0;
                  }
                }
                this.allBlogList.push(blog);
              });
          });
        } else {
        }
      });
  }

  getLeftValue(data: any) {
    this.activeTopic = data;
    this.activeAll = true;

    if (data !== 'All') {
      this.activeAll = false;
      let filterDate = this.topicDetails.filter(
        (topic) => topic['sub_category'] == data
      );
      this.leftBlogList = filterDate && filterDate[0]['blogDetails'];
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  navigate(slug: String) {
    this._router.navigate([`examples/${this.getslug}/${slug}`]);
  }

  navigate2(slug: String) {
    window.location.href = `examples/${slug}`;
  }
  async getMenu() {
    await this.commonservice
      .get('page/get-feature-item')
      .subscribe((res: any) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        if (apiResult && apiResult.status == 'SUCCESS') {
          this.menu = apiResult && apiResult.payload;
          var j = 0;
          this.menu.map((data: any) => {
            if (j < 4 && this.getslug !== data.slug) {
              this.cazzArr.push(data);
              j++;
              if (j == 3) {
                this.menuList.push(this.cazzArr);
                j = 0;
                this.cazzArr = [];
              }
            }
          });
        }
      });
  }
}
