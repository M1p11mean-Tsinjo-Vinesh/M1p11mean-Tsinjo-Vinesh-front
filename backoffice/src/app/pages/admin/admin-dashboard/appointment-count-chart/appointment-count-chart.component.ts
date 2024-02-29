import {Component, Input} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions} from "chart.js";
import {FormControl} from "@angular/forms";
import {merge, tap} from "rxjs";
import {StatsService} from "../../../../services/stats/stats.service";
import {getDaysInMonth, getMonthName} from "../../../../utils/date.utils";

@Component({
  selector: 'app-appointment-count-chart',
  templateUrl: './appointment-count-chart.component.html',
  styleUrls: ['./appointment-count-chart.component.scss']
})
export class AppointmentCountChartComponent {
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
    label: "Rendez-vous",
    backgroundColor: 'rgba(197,192,40,0.5)',
    borderColor: 'rgb(197,192,40)',
    pointBorderColor: 'rgba(197,192,40, 1)',
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

  constructor(
    private statsService: StatsService
  ) {
  }

  ngOnInit() {
    this.years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);
    const fetch = async () => {
      await this.getAppointmentsPerDay(this.selectedYear.value, new Date().getMonth() + 1);
      this.closeLoading?.();
    }
    fetch().then()
    merge(this.selectedYear.valueChanges, this.selectedMonth.valueChanges)
      .pipe(
        tap(() => {
          if(this.mode === "month") {
            this.getAppointmentsPerDay(this.selectedYear.value, parseInt(this.selectedMonth.value) + 1).then();
          } else {
            this.getAppointmentsPerMonth(this.selectedYear.value);
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

  async getAppointmentsPerDay(year: number, month: number) {
    const daysInMonth = getDaysInMonth(year, month);
    this.labels = Array.from({length: daysInMonth}, (_, i) => (i + 1).toString());
    this.statsService.getAppointmentsPerDay(year, month).subscribe(appointments => {
      this.dataset.data = Array.from({length: daysInMonth}, (_, i) => {
        const day = i + 1;
        const appointmentsForDay = appointments.find(appointment => appointment.date?.day === day);
        return appointmentsForDay?.appointmentCount || 0;
      });
      this.reloadChartData();
    })
  }

  getAppointmentsPerMonth(year: number) {
    this.labels = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    this.statsService.getAppointmentsPerMonth(year).subscribe(appointments => {
      this.dataset.data = appointments;
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
      this.getAppointmentsPerDay(this.selectedYear.value, this.selectedMonth.value + 1).then();
    } else {
      this.getAppointmentsPerMonth(this.selectedYear.value);
    }
  }
}
