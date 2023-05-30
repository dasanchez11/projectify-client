import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMainComponent } from './project-main.component';
import { ProjectHttpService } from '../../services/project-http.service';
import { of } from 'rxjs';
import { cleanStylesFromDom } from '../../../shared/test/test-helper';
import { By } from '@angular/platform-browser';
import { mockProjects } from '../../tests-utils/mock-projects';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';
import { ProjectsModule } from '../../projects.module';

describe('ProjectMainComponent', () => {
  let component: ProjectMainComponent;
  let fixture: ComponentFixture<ProjectMainComponent>;
  let mockProjectsHttp: ProjectHttpService;
  let loader: HarnessLoader;

  beforeEach(() => {
    mockProjectsHttp = {
      getAllProjects: jasmine.createSpy('').and.returnValue(of([])),
    } as unknown as ProjectHttpService;
    TestBed.configureTestingModule({
      declarations: [ProjectMainComponent],
      imports: [ProjectsModule],
      providers: [{ provide: ProjectHttpService, useValue: mockProjectsHttp }],
    });
    fixture = TestBed.createComponent(ProjectMainComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no projects message', () => {
    component.hasProjects = false;
    component.projects = [];
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.project-main__empty'))
      .nativeElement.textContent;
    expect(title).toContain(' No projects to display');
  });

  it('should display the correct amount of cards', async () => {
    component.hasProjects = true;
    component.projects = mockProjects;
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.project-card'));
    expect(cards.length).toEqual(2);
  });
});
