import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalHeaderComponent } from './normal-header.component';

describe('NormalHeaderComponent', () => {
  let component: NormalHeaderComponent;
  let fixture: ComponentFixture<NormalHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NormalHeaderComponent]
    });
    fixture = TestBed.createComponent(NormalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
