import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalHeaderSignupComponent } from './normal-header-signup.component';

describe('NormalHeaderSignupComponent', () => {
  let component: NormalHeaderSignupComponent;
  let fixture: ComponentFixture<NormalHeaderSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NormalHeaderSignupComponent]
    });
    fixture = TestBed.createComponent(NormalHeaderSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
