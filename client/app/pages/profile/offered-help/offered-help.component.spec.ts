import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OfferedHelpComponent } from './offered-help.component';

describe('OfferedHelpComponent', () => {
  let component: OfferedHelpComponent;
  let fixture: ComponentFixture<OfferedHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferedHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
