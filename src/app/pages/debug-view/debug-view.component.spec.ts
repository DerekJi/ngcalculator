import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugViewComponent } from './debug-view.component';

describe('DebugViewComponent', () => {
  let component: DebugViewComponent;
  let fixture: ComponentFixture<DebugViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebugViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebugViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
