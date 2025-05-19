import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigneePreviewComponent } from './assignee-preview.component';

describe('AssigneePreviewComponent', () => {
  let component: AssigneePreviewComponent;
  let fixture: ComponentFixture<AssigneePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssigneePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssigneePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
