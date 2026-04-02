import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BachecaFormComponent } from './bacheca-form.component';

describe('BachecaFormComponent', () => {
  let component: BachecaFormComponent;
  let fixture: ComponentFixture<BachecaFormComponent>;

  beforeEach(waitForAsync(() => {
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
