import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdLeftSidebarComponent } from './ad-left-sidebar.component';

describe('LeftAdSidebarComponent', () => {
  let component: AdLeftSidebarComponent;
  let fixture: ComponentFixture<AdLeftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdLeftSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
