import { Component } from '@angular/core';
import { CommonService } from '../../../common/common.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent {

  param: any;
  getslug: string = "";
  examplesHeader: any = {};
  examplesList: any = {};
  keys: any;
  examples: any;
  array: any = []


  constructor(
    public commonservice: CommonService,
    private router: ActivatedRoute,
  ) {
    this.getslug = this.router.snapshot.params['topic']
    console.log("SLUG>>>>>>>>>>", this.getslug)
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

        const topicDetails = apiResult.payload;
        if (apiResult && apiResult.status == 'SUCCESS') {
          this.examplesHeader = apiResult && topicDetails.topic;

          console.log("examplesHeader>>>>>>>>", this.examplesHeader);
          console.log("examplesHeader TYPE>>>>>>>>", typeof (this.examplesHeader));
        }
        if (apiResult && apiResult.status == 'SUCCESS') {
          this.examplesList = apiResult && topicDetails.relation;
          console.log("examplesList>>>>>>>>>", this.examplesList);
          console.log("examplesList TYPE>>>>>>>>>", typeof (this.examplesList));
          const keyList = Object.keys(this.examplesList)
          const getType = (value: any) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
          keyList.forEach((key) => {
            if (getType(this.examplesList[key]) === 'object') {
              const newKeyList = (this.examplesList[key].blogDetails);
              newKeyList.map((example: any) => {
                this.examples = example
                const ccc = this.array.push(example)
                console.log(this.array)
                console.log("TITLE>>>>>>>>>>>>", this.examples.title)
                console.log("TITLE>>>>>>>>>>>>Type>>>>", typeof (this.examples.title))

              })
            }
          });

          this.keys = Object.keys(this.examplesList)
          console.log("KEYS>>>>>>>", this.keys);
          // console.log("XYZ>>>>>>", xyz.blogDetails)
          console.log("KEYS TYPES>>>>>>>", typeof (this.keys));


        }
      })
  }

  // async getMenu() {
  //   await this.commonservice.get('page/get-feature-item').subscribe((res: any) => {
  //     const apiResult = JSON.parse(JSON.stringify(res));
  //     console.log(apiResult.payload);
  //     if (apiResult && apiResult.status == 'SUCCESS') {
  //       this.menu = apiResult && apiResult.payload;
  //     }
  //   })
  // }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
