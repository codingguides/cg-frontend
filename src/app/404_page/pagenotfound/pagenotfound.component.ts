import { Component } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css'],
})
export class PagenotfoundComponent {
  load: boolean = false;
  ngOnInit() {
    setTimeout(() => {
      this.load = true;
    }, 1000);
  }
}
