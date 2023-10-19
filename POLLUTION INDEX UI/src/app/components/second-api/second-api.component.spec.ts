import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondApiComponent } from './second-api.component';

describe('SecondApiComponent', () => {
  let component: SecondApiComponent;
  let fixture: ComponentFixture<SecondApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
