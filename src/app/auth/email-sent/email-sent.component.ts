import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { error } from 'jquery';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.css'],
})
export class EmailSentComponent {
  formgroup!: FormGroup;
  email_sent: FormGroup | any;
  success_msg: any;
  error_msg: any;
  errMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    public commonservice: CommonService
  ) {
    this.email_sent = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.email_sent.get('email');
  }

  async emailSentData(formData: any) {
    const email = formData['email'];

    this.commonservice.post({ email: email }, 'user/forgot-password').subscribe(
      (res: any) => {
        const apiResult = JSON.parse(JSON.stringify(res));
        console.log(apiResult['message']);

        if (apiResult['success'] == true) {
          $('#success-message').show();
          $('#error-message').hide();
          this.success_msg = apiResult['message'];
          this.email_sent.reset();
          // $('#myModalData').hide();
          setTimeout(() => {
            const modal = document.getElementById('myModalData');
            if (modal != null) {
              modal.style.display = 'none';
            }
          }, 3000);
        }
      },
      (error) => {
        this.errMessage = error.error.message;
        console.log(this.errMessage);
        $('#error-message').show();
        this.error_msg = this.errMessage;
      }
    );
  }
}
