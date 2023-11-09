import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { SharedService } from 'src/app/common/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  
  constructor(
    public commonservice: CommonService,
    public sharedService: SharedService,
    private router: ActivatedRoute
  ) { }

  list: any;
  flag: boolean = false;
  error: string = "";
  param = this.router.snapshot.params['topic'];

  async ngOnInit(){
    console.log("this.param>>>>>>>>>>>",this.param)
    await this.getList();
  }

  async getList() {
    console.clear();
    console.log(`-------------page/search/${this.param}----------------`)
    await this.commonservice
      .get(`page/search/${this.param}`)
      .subscribe((res) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        console.log("apiResult>>>>>", apiResult)
        if (apiResult && apiResult.status == 'SUCCESS') {
          this.list = apiResult && apiResult.payload;
          console.log(">length<<<<<<<<<",this.list.length)
          console.log(">this.list<<<<<<<<<",this.list)
          if (this.list.length > 0) {
            this.flag = true;
            console.log(">>>>>>>>>if<<<<<<<<<<<")
          }else{
            this.flag = false;
            console.log(">>>>>>>>>else<<<<<<<<<<<")
          }
        } else {
          this.flag = false;
          this.error = "";
        }
      });
  }

  render(slug:string){
    this.sharedService.isQuizLiveCheck(`quiz/${slug}`, false);
  }
}
