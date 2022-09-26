import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTransform',
  pure: false
})
export class DateTransformPipe implements PipeTransform {

  transform(value: moment.Moment, format: string = 'MMMM YYYY'): string {
    return value.format(format);
  }

}
