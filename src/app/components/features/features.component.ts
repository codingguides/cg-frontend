import { Component } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {

  menu: any

  constructor(public commonservice: CommonService, private router: Router) { }

  ngOnInit() {
    this.getMenu();
  }


  async getMenu() {
    await this.commonservice.get('page/get-feature-item').subscribe((res: any) => {
      const apiResult = JSON.parse(JSON.stringify(res));
      console.log(apiResult.payload);
      if (apiResult && apiResult.status == 'SUCCESS') {
        this.menu = apiResult && apiResult.payload;
      }
    })
  }

  navigate(slug: String) {
    this.router.navigate([`examples/${slug}`]);
  }



}
