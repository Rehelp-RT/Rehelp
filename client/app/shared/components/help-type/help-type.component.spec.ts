import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTypeComponent } from './help-type.component';

describe('HelpTypeComponent', () => {
  let component: HelpTypeComponent;
  let fixture: ComponentFixture<HelpTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
