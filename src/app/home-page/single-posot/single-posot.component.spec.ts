import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglePosotComponent } from './single-posot.component';

describe('SinglePosotComponent', () => {
  let component: SinglePosotComponent;
  let fixture: ComponentFixture<SinglePosotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglePosotComponent]
    });
    fixture = TestBed.createComponent(SinglePosotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
