import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BachecaComponent } from './bacheca.component';

describe('BachecaComponent', () => {
  let component: BachecaComponent;
  let fixture: ComponentFixture<BachecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BachecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BachecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
