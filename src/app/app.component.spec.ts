import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Checking if minute variable is set if correct`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onChangeMinuteCheck({target: {value: 23}})
    expect(app.newMinute).toEqual(23);
  });

  it(`Checking if second variable is not set if given greater value than 60`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onChangeMinuteCheck({target: {value: 69}})
    expect(app.newSecond).toEqual('');
  });

  it(`Checking if hour variable is not set if given incorrect value`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.onChangeMinuteCheck({target: {value: 'hj'}})
    expect(app.newSecond).toEqual('');
  });

  it(`Checking if 0 is appended when single digit on clock`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const val = app.format(1);
    expect(val).toEqual('01');
  });

  it(`Checking if date varibles are set and reset`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.newHour = 2;
    app.newMinute = 23;
    app.newSecond = 34;
    app.updateTime();
    expect(app.hour).toEqual(2);
    expect(app.newHour).toEqual('');
    expect(app.minute).toEqual(23);
    expect(app.newMinute).toEqual('');
    expect(app.second).toEqual(34);
    expect(app.newSecond).toEqual('');
  });
});
