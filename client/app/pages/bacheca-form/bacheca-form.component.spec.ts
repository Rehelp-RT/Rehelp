import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BachecaFormComponent } from './bacheca-form.component';

describe('BachecaFormComponent', () => {
  let component: BachecaFormComponent;
  let fixture: ComponentFixture<BachecaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BachecaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BachecaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
