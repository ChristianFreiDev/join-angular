import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableSubtaskComponent } from './editable-subtask.component';

describe('EditableSubtaskComponent', () => {
  let component: EditableSubtaskComponent;
  let fixture: ComponentFixture<EditableSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableSubtaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
