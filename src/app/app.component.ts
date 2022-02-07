import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  hourHandStyle: any; 
  minuteHandStyle: any;  
  secondHandStyle: any;  
  timerId: any;
  date !: Date;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  runningHour: number = 0;
  runningMinute: number = 0;
  runningSecond: number = 0;
  newHour: any = '';
  newMinute: any = '';
  newSecond: any = '';

  ngAfterViewInit() {
    this.timerId = this.getTime();
  }

  runClock() {
    this.hourHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.hour * 30) + (this.minute * 0.5) + (this.second * (0.5 / 60))}deg)` };
    this.minuteHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.minute * 6) + (this.second * 0.1)}deg)` };
    this.secondHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${this.second * 6}deg)` };
  }

  onChangeHourCheck(event: any){
    if(event.target.value > 0 && event.target.value < 24)
      this.newHour = parseInt(event.target.value)
    else
      event.target.value = ''
  }

  onChangeMinuteCheck(event: any){
    if(event.target.value > 0 && event.target.value < 60)
      this.newMinute = parseInt(event.target.value)
    else
      event.target.value = ''
  }

  onChangeSecondCheck(event: any){
    if(event.target.value > 0 && event.target.value < 60)
      this.newSecond = parseInt(event.target.value)
    else
      event.target.value = ''
  }

  getTime() {
    return setInterval(() => {
      this.date = new Date();
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();

      this.runClock();
    }, 1000);
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

  updateTime() {
    if(this.newHour != '' && this.newMinute != '' && this.newSecond != ''){
      clearInterval(this.timerId);
      this.runningHour = this.newHour;
      this.runningMinute = this.newMinute;
      this.runningSecond = this.newSecond;
      this.hour = this.runningHour;
      this.minute = this.runningMinute;
      this.second = this.runningSecond;
      this.newHour = ''
      this.newMinute = ''
      this.newSecond = ''

      this.timerId = setInterval(() => {
        if(this.runningSecond == 59){
          this.runningSecond = 0
          this.runningMinute += 1
        }
        if(this.runningMinute == 60){
          this.runningMinute = 0
          this.runningHour += 1
        }
        if(this.runningHour == 24){
          this.runningHour = 0
        }
        this.runClock();
        this.hour = this.runningHour;
        this.minute = this.runningMinute;
        this.second = this.runningSecond;
        this.runningSecond += 1;
      }, 1000);
    }
  }
}
