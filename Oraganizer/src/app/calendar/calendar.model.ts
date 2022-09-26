import * as moment from 'moment';

export interface Day {
  dateValue: moment.Moment;
  isActive: boolean;
  isDisabled: boolean;
  selected: boolean;
}

export interface  Week {
  days: Day[];
}
