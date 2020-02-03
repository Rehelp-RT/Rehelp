import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpsDetailComponent } from './helps-detail.component';

describe('HelpsDetailComponent', () => {
  let component: HelpsDetailComponent;
  let fixture: ComponentFixture<HelpsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
