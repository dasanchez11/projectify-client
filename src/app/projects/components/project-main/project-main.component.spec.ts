import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMainComponent } from './project-main.component';

describe('ProjectMainComponent', () => {
  let component: ProjectMainComponent;
  let fixture: ComponentFixture<ProjectMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMainComponent]
    });
    fixture = TestBed.createComponent(ProjectMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
