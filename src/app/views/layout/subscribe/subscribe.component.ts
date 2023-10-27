import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  formGroup!: FormGroup;
  login: FormGroup | any;
  error: any;
  success: any;

  constructor(
    private _route: Router,
    private http: HttpClient,
    public commonservice: CommonService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.login = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])]
    });
  }
  ngOnInit(): void { }

  get email() {
    return this.formGroup.get('email');
  }

  async newsletter(formData: any) {
    const email = formData['email'];
    await this.commonservice
      .login(
        {
          email: email
        },
        'page/newsletter'
      )
      .subscribe(res => {
        const apiResult = JSON.parse(JSON.stringify(res));
        if (apiResult['result'] == "success") {
          this.toastr.success("We will get back to you soon.")
          this.success = "We will get back to you soon."
          this.error = ""
          this.login.reset()
        }
        else {
          apiResult.errors.map((err: object) => {
            this.error = JSON.parse(JSON.stringify(err));
            this.error = this.error.msg;
            this.success = "";
          })
        }
      });
  }

}
