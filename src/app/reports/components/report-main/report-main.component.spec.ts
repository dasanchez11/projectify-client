import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMainComponent } from './report-main.component';
import { BehaviorSubject, of } from 'rxjs';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  convertToParamMap,
} from '@angular/router';
import { ReportHttpService } from '../../services/report-http.service';
import { ReportsModule } from '../../reports.module';
import { cleanStylesFromDom } from '../../../shared/test/test-helper';

describe('ReportMainComponent', () => {
  let component: ReportMainComponent;
  let fixture: ComponentFixture<ReportMainComponent>;
  let paramValue = { 'week-value': '2023-W21' };
  let queryParam = new BehaviorSubject<ParamMap>(convertToParamMap(paramValue));
  let mockRouter: Router;
  let mockReportHttp: ReportHttpService;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('router', ['navigate']);
    mockReportHttp = {
      getWeeklyReport: jasmine.createSpy('').and.returnValue(of(true)),
    } as unknown as ReportHttpService;

    await TestBed.configureTestingModule({
      declarations: [ReportMainComponent],
      imports: [ReportsModule],
      providers: [
        {
          provide: ReportHttpService,
          useValue: mockReportHttp,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: queryParam,
          },
        },
      ],
    }).compileComponents();
  });

  describe('validate week params', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(ReportMainComponent);
      component = fixture.componentInstance;
      spyOn(component, 'validDateFormat').and.returnValue(true);
      jasmine
        .createSpy('getWeekAndYearFromIsoDate')
        .and.returnValues({ currentWeek: 21, currentYear: 2023 });
      jasmine.createSpy('getWeek').and.returnValues([]);
      jasmine.createSpy('getMontName').and.returnValues('January');
      fixture.detectChanges();
      queryParam.next(convertToParamMap(paramValue));
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    afterAll(() => {
      cleanStylesFromDom();
    });

    it('should handle click right', () => {
      const next = jasmine.createSpy('getNextWeek').and.returnValues([]);
      component.handleClick(true);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    });

    it('should handle click left', () => {
      const next = jasmine.createSpy('getPrevWeek').and.returnValues([]);
      component.handleClick(false);
      expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    });

    it('should validate Date format', () => {
      const input = '2023-W54';
      const result = component.validDateFormat(input);
      expect(result).toBeTrue();
      expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
    });

    it('should validate Date format', () => {
      const result = component.validDateFormat('2023-W21');
      expect(result).toBeTrue();
      expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
    });
  });

  describe('week params invalid', () => {
    beforeEach(async () => {
      fixture = TestBed.createComponent(ReportMainComponent);
      queryParam.next(convertToParamMap(paramValue));
      jasmine
        .createSpy('getIsoDateFromCurrentDate')
        .and.returnValues({ currentWeek: 21, currentYear: 2023 });
      queryParam.next(convertToParamMap({}));
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
