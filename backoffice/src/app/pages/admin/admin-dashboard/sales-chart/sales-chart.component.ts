import {Component, Input} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions} from "chart.js";
import {FormControl} from "@angular/forms";
import {merge, tap} from "rxjs";
import {StatsService} from "../../../../services/stats/stats.service";
import {getDaysInMonth, getMonthName} from "../../../../utils/date.utils";

@Component({
  selector: 'app-sales-chart',
  templateUrl: './sales-chart.component.html',
  styleUrls: ['./sales-chart.component.scss']
})
export class SalesChartComponent {
  protected readonly getMonthName = getMonthName;
  @Input()
  public closeLoading?: Function;

  months = [0,1,2,3,4,5,6,7,8,9,10,11]
  years: number[] = []
  chartData: ChartData<"line"> = {
    labels: [],
    datasets: []
  }
  dataset: ChartDataset<"line"> = {
    label: "Chiffres d'affaires",
    backgroundColor: 'rgba(0, 123, 255, 0.5)',
    borderColor: 'rgba(0, 123, 255, 1)',
    pointBorderColor: 'rgba(0, 123, 255, 1)',
    pointBackgroundColor: '#fff',
    data: []
  }
  labels: string[] = [];
  selectedYear: FormControl = new FormControl<number>(new Date().getFullYear());
  selectedMonth: FormControl = new FormControl<number>(new Date().getMonth());
  chartRef: any;
  mode: "month" | "year" = "month";
  options: ChartOptions<"line"> = {
      responsive:true,
      maintainAspectRatio: false,
  }

  constructor(private statsService: StatsService) {
  }

  ngOnInit() {
    this.years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);
    this.getSalesPerDay(this.selectedYear.value, new Date().getMonth() + 1,true);

    merge(this.selectedYear.valueChanges, this.selectedMonth.valueChanges)
      .pipe(
        tap(() => {

          if(this.mode === "month") {
            this.getSalesPerDay(this.selectedYear.value, parseInt(this.selectedMonth.value) + 1);
          } else {
            this.getSalesPerMonth(this.selectedYear.value);
          }
        })
      )
      .subscribe()
  }

  reloadChartData() {
    this.chartData.labels = this.labels;
    this.chartData.datasets = [];
    this.chartData.datasets.push(this.dataset);
    this.chartRef.data = this.chartData;
    this.chartRef?.update();
  }

  getSalesPerDay(year: number, month: number, closeLoading: boolean = false) {
    console.log(year, month)
    const daysInMonth = getDaysInMonth(year, month);
    this.labels = Array.from({length: daysInMonth}, (_, i) => (i + 1).toString());
    this.statsService.getSalesPerDay(year, month).subscribe(sales => {
      this.dataset.data = Array.from({length: daysInMonth}, (_, i) => {
        const day = i + 1;
        const salesForDay = sales.find(sale => sale.date?.day === day);
        return salesForDay?.sales || 0;
      });
      this.reloadChartData();
      if (closeLoading) {
        this.closeLoading?.();
      }
    })
  }

  getSalesPerMonth(year: number) {
    this.labels = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    this.statsService.getSalesPerMonth(year).subscribe(sales => {
      this.dataset.data = Array.from({length: 12}, (_, i) => {
        const month = i + 1;
        const salesForMonth = sales.find(sale => sale.month?.month === month);
        return salesForMonth?.sales || 0;
      });
      this.reloadChartData();
    })
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.chartRef = $chartRef;
    }
  }

  handleModeChange(mode: "month" | "year") {
    this.mode = mode;
    if(mode === "month") {
      this.getSalesPerDay(this.selectedYear.value, this.selectedMonth.value + 1);
    } else {
      this.getSalesPerMonth(this.selectedYear.value);
    }
  }
}
