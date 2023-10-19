import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondApiCardDisplayComponent } from './second-api-card-display.component';

describe('SecondApiCardDisplayComponent', () => {
  let component: SecondApiCardDisplayComponent;
  let fixture: ComponentFixture<SecondApiCardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondApiCardDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondApiCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
