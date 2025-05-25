import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneeOptionComponent } from './assignee-option.component';

describe('AssigneeOptionComponent', () => {
  let component: AssigneeOptionComponent;
  let fixture: ComponentFixture<AssigneeOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigneeOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigneeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
