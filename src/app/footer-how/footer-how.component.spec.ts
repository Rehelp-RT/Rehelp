import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterHowComponent } from './footer-how.component';

describe('FooterHowComponent', () => {
  let component: FooterHowComponent;
  let fixture: ComponentFixture<FooterHowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterHowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterHowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
