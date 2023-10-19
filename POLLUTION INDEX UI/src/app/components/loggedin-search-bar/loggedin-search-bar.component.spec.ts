import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedinSearchBarComponent } from './loggedin-search-bar.component';

describe('LoggedinSearchBarComponent', () => {
  let component: LoggedinSearchBarComponent;
  let fixture: ComponentFixture<LoggedinSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedinSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedinSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
