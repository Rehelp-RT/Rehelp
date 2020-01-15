import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpsEditComponent } from './helps-edit.component';

describe('HelpsEditComponent', () => {
  let component: HelpsEditComponent;
  let fixture: ComponentFixture<HelpsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
