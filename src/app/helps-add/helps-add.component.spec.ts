import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpsAddComponent } from './helps-add.component';

describe('HelpsAddComponent', () => {
  let component: HelpsAddComponent;
  let fixture: ComponentFixture<HelpsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
