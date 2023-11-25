import { Component } from '@angular/core';
import { SharedService } from './common/shared.service';
import { MetaService } from './common/meta.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Codingguides';

  constructor(public sharedService: SharedService, public metaService: MetaService, private router: Router,
    private activatedRoute: ActivatedRoute) {

  }
  ngOnInit() {

    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   map(() => this.activatedRoute),
    //   map((route) => {
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   }),
    //   filter((route) => route.outlet === 'primary'),
    //   mergeMap((route) => route.data)
    // )
    //   .subscribe((event) => {

    //     console.log("EVENT", event)
    //     this.metaService.updateTitle(event['title']);
    //     this.metaService.updateOgUrl(event['ogUrl']);
    //     //Updating Description tag dynamically with title
    //     this.metaService.updateDescription(event['title'] + event['description'])
    //   });
  }
}

