import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFaqComponent } from './footer-faq.component';

describe('FooterFaqComponent', () => {
  let component: FooterFaqComponent;
  let fixture: ComponentFixture<FooterFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
