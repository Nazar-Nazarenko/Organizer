import { Component, OnInit } from '@angular/core';
import { Week } from './calendar.model';
import { DateService } from '../infrastructure/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public calendar: Week[];

  constructor(private dateService: DateService) { }

  private static generateDate(current: moment.Moment): void {
    const firstDay = current.clone().startOf('month').startOf('week');
    const lastDay = current.clone().endOf('month').endOf('week');

    const currentDate = firstDay.clone().subtract(1, 'day');

    const commonCalendar = [];

    while (currentDate.isBefore(lastDay, 'day')) {
      commonCalendar.push({
        days: Array(7)
          .fill(0)
          .map( () => {
            // tslint:disable-next-line:no-shadowed-variable
            const dateValue = currentDate.add(1, 'day').clone();
            const isActive = moment().isSame( dateValue, 'date');
            const isDisabled = !current.isSame( dateValue, 'month');
            const selected = current.isSame( dateValue, 'date');

            return {
              dateValue,
              isActive,
              isDisabled,
              selected
            };
          })
      });
    }
    // @ts-ignore
    this.calendar = commonCalendar;
    // @ts-ignore
    console.log(this.calendar);
  }

  ngOnInit(): void {
    this.dateService.date.subscribe(CalendarComponent.generateDate.bind(this));
  }

  public selectDay(day: moment.Moment): void {
    this.dateService.changeDate(day);
  }

}
