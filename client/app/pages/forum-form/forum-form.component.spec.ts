import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ForumFormComponent } from './forum-form.component';

describe('ForumFormComponent', () => {
  let component: ForumFormComponent;
  let fixture: ComponentFixture<ForumFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
