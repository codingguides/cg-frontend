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

  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private _router: Router
  ) {
    this.getslug = this.router.snapshot.params['topic'];
    console.log('SLUG>>>>>>>>>>', this.getslug);
  }

  ngOnInit() {
    this.getMenuSidebar();
    this.getExamples();
  }

  async getMenuSidebar() {
    this.param = this.router.snapshot.params['topic'];
  }

  async getExamples() {
    await this.commonservice
      .get(`page/blog/${this.getslug}`)
      .subscribe((res: any) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        console.log(apiResult);

        const topicDetails = apiResult.payload;
        if (apiResult && apiResult.status == 'SUCCESS') {
          this.examplesHeader = apiResult && topicDetails.topic;
          this.topicDetails = apiResult && topicDetails.res;
          console.log(this.topicDetails);
          console.log(this.examplesHeader);
          this.topicDetails.map((topic: any) => {
            this.rightTopic.push(topic && topic['sub_category']);
            topic &&
              topic['blogDetails'].map((blog: any) => {
                this.allBlogList.push(blog);
                console.log(this.allBlogList);
              });
          });
        } else {
        }
      });
  }

  getLeftValue(data: any) {
    console.log(data);
    this.activeTopic = data;
    this.activeAll = true;

    if (data !== 'All') {
      this.activeAll = false;
      let filterDate = this.topicDetails.filter(
        (topic) => topic['sub_category'] == data
      );
      this.leftBlogList = filterDate && filterDate[0]['blogDetails'];
      console.log(this.leftBlogList);
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  navigate(slug: String) {
    this._router.navigate([`examples/${this.getslug}/${slug}`]);
  }
}
