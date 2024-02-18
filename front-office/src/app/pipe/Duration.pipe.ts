import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number, valueUnit: 'h'|'m'|'s', precision: 'h'|'m'|'s' = 's'): string {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let result = '';
    switch (valueUnit) {
      case 'h':
        hours = value;
        result = `${hours}h`;
        break;
      case 'm':
        hours = Math.floor(value / 60);
        minutes = value % 60;
        result = `${hours}h${minutes}`;
        break;
      case 's':
        hours = Math.floor(value / 3600);
        minutes = Math.floor(value % 3600 / 60);
        seconds = value % 60;
        result = `${hours}h${minutes}m${seconds}`;
        break;
    }
    return result;
  }
}