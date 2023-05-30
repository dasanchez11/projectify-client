import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthModule } from '../../auth.module';
import { AuthHttpService } from '../../services/auth-http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthHttp: any;
  let mockRouter: Router;
  let loader: HarnessLoader;

  beforeEach(async () => {
    mockAuthHttp = {
      register: jasmine.createSpy('').and.returnValue(of(false)),
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [AuthModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [{ provie: AuthHttpService, useValue: mockAuthHttp }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router);
    mockAuthHttp = TestBed.inject(AuthHttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle visibility', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    let inputType = await inputs[3].getType();
    expect(inputType).toBe('password');
    component.toggleVisibility('password');
    let inputTypeTwo = await inputs[3].getType();
    expect(inputTypeTwo).toBe('text');
  });

  it('should toggle visibility for password confirm', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    let inputType = await inputs[4].getType();
    expect(inputType).toBe('password');
    component.toggleVisibility('confirmPassword');
    let inputTypeTwo = await inputs[4].getType();
    expect(inputTypeTwo).toBe('text');
  });

  it('Should get the form control', async () => {
    const control = component.getControl('password');
    const instance = control instanceof AbstractControl;
    expect(instance).toBe(true);
  });

  it('Should submit', async () => {
    spyOnProperty(component.registerForm, 'valid').and.returnValue(true);
    spyOn(mockRouter, 'navigate');
    (mockAuthHttp.register = jasmine.createSpy('').and.returnValue(of(false))),
      component.onSubmit();
    expect(mockAuthHttp.register).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  });

  it('Should submit if form valid', async () => {
    spyOnProperty(component.registerForm, 'valid').and.returnValue(true);
    spyOn(mockRouter, 'navigate');
    (mockAuthHttp.register = jasmine.createSpy('').and.returnValue(of(true))),
      component.onSubmit();
    expect(mockAuthHttp.register).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
  });
});
