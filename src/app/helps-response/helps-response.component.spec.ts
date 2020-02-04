import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpsResponseComponent } from './helps-response.component';

describe('HelpsResponseComponent', () => {
  let component: HelpsResponseComponent;
  let fixture: ComponentFixture<HelpsResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpsResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpsResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
