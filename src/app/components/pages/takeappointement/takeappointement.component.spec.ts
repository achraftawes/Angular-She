import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeappointementComponent } from './takeappointement.component';

describe('TakeAppointementComponent', () => {
  let component: TakeappointementComponent;
  let fixture: ComponentFixture<TakeappointementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeappointementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeappointementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
