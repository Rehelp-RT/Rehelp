import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RequestedHelpComponent } from './requested-help.component';

describe('RequestedHelpComponent', () => {
  let component: RequestedHelpComponent;
  let fixture: ComponentFixture<RequestedHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
