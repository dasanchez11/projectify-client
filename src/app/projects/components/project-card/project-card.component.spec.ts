import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardComponent } from './project-card.component';
import { cleanStylesFromDom } from '../../../shared/test/test-helper';
import { By } from '@angular/platform-browser';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCardComponent],
    });
    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const myTitle = 'this is my title';
    component.title = myTitle;
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.project-card__title'))
      .nativeElement.textContent;
    expect(title).toContain(myTitle);
  });

  it('should display description', () => {
    const mydesc = 'this is my description';
    component.description = mydesc;
    fixture.detectChanges(); // missed
    const description = fixture.debugElement.query(
      By.css('.project-card__description')
    ).nativeElement.textContent;
    expect(description).toContain(mydesc);
  });
});
