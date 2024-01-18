import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../common/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  getToken:any = ""

  constructor(
    private http: HttpClient,
    public commonservice: CommonService,
    private router: ActivatedRoute,
    private router2: Router,
  ) {
    this.getToken = this.router.snapshot.params['token']
    console.log("getToken>>>>>>>>", this.getToken);
    alert(this.getToken);
  }
}
