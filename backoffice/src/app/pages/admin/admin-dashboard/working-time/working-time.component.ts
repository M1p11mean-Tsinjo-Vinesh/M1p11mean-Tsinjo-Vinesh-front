import { Component } from '@angular/core';
import {WorkingTimeDto} from "../../../../dto/workingTime.dto";
import {FormControl} from "@angular/forms";
import {merge, tap} from "rxjs";
import {StatsService} from "../../../../services/stats/stats.service";
import {getMonthName} from "../../../../utils/date.utils";

@Component({
  selector: 'app-working-time',
  templateUrl: './working-time.component.html',
  styleUrls: ['./working-time.component.scss']
})
export class WorkingTimeComponent {
  protected readonly getMonthName = getMonthName;

  months = [0,1,2,3,4,5,6,7,8,9,10,11]
  years: number[] = []
  workingTimeDisplayedColumns: string[] = ["name","email","workingTime"];
  workingTimeDataSource: WorkingTimeDto[] = []
  workingTimeSelectedYear: FormControl = new FormControl<number>(new Date().getFullYear());
  workingTimeSelectedMonth: FormControl = new FormControl<number>(new Date().getMonth());

  constructor(
    private statsService: StatsService
  ) {}

  ngOnInit() {
    this.years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);
    this.getMeanWorkingTime(this.workingTimeSelectedYear.value, new Date().getMonth() + 1);
    merge(this.workingTimeSelectedYear.valueChanges, this.workingTimeSelectedMonth.valueChanges)
      .pipe(
        tap(() => {
          this.getMeanWorkingTime(this.workingTimeSelectedYear.value, parseInt(this.workingTimeSelectedMonth.value) + 1);
        })
      )
      .subscribe()
  }

  getMeanWorkingTime(year: number, month: number) {
    this.statsService.getMeanWorkingTime(year, month).subscribe(workingTimes => {

      this.workingTimeDataSource = workingTimes;
    })
  }

  calculateWorkingTimeGeneralMean() {
    return this.workingTimeDataSource.reduce((acc, current) => acc + current.meanWorkingTime, 0) / this.workingTimeDataSource.length;
  }

}
