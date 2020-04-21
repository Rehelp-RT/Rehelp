import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedHelpComponent } from './offered-help.component';

describe('OfferedHelpComponent', () => {
  let component: OfferedHelpComponent;
  let fixture: ComponentFixture<OfferedHelpComponent>;

  beforeEach(async(() => {
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
