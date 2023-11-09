import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdRightSidebarComponent } from './ad-right-sidebar.component';

describe('AdSidebarComponent', () => {
  let component: AdRightSidebarComponent;
  let fixture: ComponentFixture<AdRightSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdRightSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
