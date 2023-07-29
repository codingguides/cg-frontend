import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderLatestPostsComponent } from './slider-latest-posts.component';

describe('SliderLatestPostsComponent', () => {
  let component: SliderLatestPostsComponent;
  let fixture: ComponentFixture<SliderLatestPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderLatestPostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderLatestPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
