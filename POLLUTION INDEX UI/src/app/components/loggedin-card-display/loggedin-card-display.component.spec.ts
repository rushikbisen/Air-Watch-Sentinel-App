import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinCardDisplayComponent } from './loggedin-card-display.component';

describe('LoggedinCardDisplayComponent', () => {
  let component: LoggedinCardDisplayComponent;
  let fixture: ComponentFixture<LoggedinCardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedinCardDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedinCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
