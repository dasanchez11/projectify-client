import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthHttpService } from '../../services/auth-http.service';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../../shared/services/current-user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthModule } from '../../auth.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { AbstractControl } from '@angular/forms';
import { cleanStylesFromDom } from '../../../shared/test/test-helper';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthHttp: any;
  let mockAuthService: Partial<AuthService>;
  let mockCurrentUserService: CurrentUserService;
  let mockRouter: Router;
  let loader: HarnessLoader;

  beforeEach(async () => {
    mockAuthHttp = {
      login: jasmine.createSpy('').and.returnValue(of(true)),
    };
    mockAuthService = {
      isLoading$: of(false),
    };
    mockCurrentUserService = jasmine.createSpyObj(mockCurrentUserService, [
      'setCurrentUser',
    ]);
    mockRouter = jasmine.createSpyObj(mockRouter, ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        AuthModule,
        MatFormFieldModule,
        MatInputModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: AuthHttpService, useValue: mockAuthHttp },
        { proviede: CurrentUserService, useValue: mockCurrentUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    mockAuthHttp = TestBed.inject(AuthHttpService);
    mockAuthService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit', async () => {
    mockAuthHttp.login = jasmine.createSpy('login').and.returnValue(of(false));
    spyOn(component, 'onSubmit');
    (component.loginForm.status as any) = false;
    let SubmitButton = await loader.getHarness(MatButtonHarness);
    let inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('test@gmail.com');
    await inputs[1].setValue('password-password');
    await SubmitButton.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should submit if form valid', async () => {
    spyOnProperty(component.loginForm, 'valid').and.returnValue(true);
    spyOn(mockRouter, 'navigate');
    component.onSubmit();
    expect(mockAuthHttp.login).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
  });

  it('should toggle visibility', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    let inputType = await inputs[1].getType();
    expect(inputType).toBe('password');
    component.toggleVisibility();
    let inputTypeTwo = await inputs[1].getType();
    expect(inputTypeTwo).toBe('text');
  });

  it('Should get the form control', async () => {
    const control = component.getControl('password');
    const instance = control instanceof AbstractControl;
    expect(instance).toBe(true);
  });

  it('Should not submit if invalid inputs', async () => {
    spyOn(component, 'onSubmit');
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);

    await inputs[0].setValue('test');
    await button.click();

    const buttonStatus = await button.isDisabled();
    expect(buttonStatus).toBe(true);
    expect(component.onSubmit).not.toHaveBeenCalled();
  });
});
