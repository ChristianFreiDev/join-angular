import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveTaskMenuComponent } from './move-task-menu.component';

describe('MoveTaskMenuComponent', () => {
  let component: MoveTaskMenuComponent;
  let fixture: ComponentFixture<MoveTaskMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveTaskMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoveTaskMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
