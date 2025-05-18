import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTaskModalComponent } from './open-task-modal.component';

describe('OpenTaskModalComponent', () => {
  let component: OpenTaskModalComponent;
  let fixture: ComponentFixture<OpenTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenTaskModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
