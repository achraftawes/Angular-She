import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddTrainingComponent } from './edit-or-add-training.component';

describe('EditOrAddTrainingComponent', () => {
  let component: EditOrAddTrainingComponent;
  let fixture: ComponentFixture<EditOrAddTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOrAddTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
