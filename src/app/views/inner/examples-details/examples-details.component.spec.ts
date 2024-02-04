import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesDetailsComponent } from './examples-details.component';

describe('ExamplesDetailsComponent', () => {
  let component: ExamplesDetailsComponent;
  let fixture: ComponentFixture<ExamplesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamplesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamplesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
