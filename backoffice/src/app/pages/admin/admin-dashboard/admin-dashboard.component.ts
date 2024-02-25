import { Component } from '@angular/core';
import {ChartComponent, ChartData, ChartDataset} from "chart.js";
import {StatsService} from "../../../services/stats/stats.service";
import {FormControl} from "@angular/forms";
import {merge, tap} from "rxjs";
import {WorkingTimeDto} from "../../../dto/workingTime.dto";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  // Sales
  months = [0,1,2,3,4,5,6,7,8,9,10,11]
  years: number[] = []
  salesChartData: ChartData = {
    labels: [],
    datasets: []
  }
  salesDatasets: ChartDataset = {
    label: "Chiffres d'affaires",
    backgroundColor: 'rgba(0, 123, 255, 0.5)',
    borderColor: 'rgba(0, 123, 255, 1)',
    pointBorderColor: 'rgba(0, 123, 255, 1)',
    pointBackgroundColor: '#fff',
    data: []
  }
  salesLabels: string[] = [];
  salesChartSelectedYear: FormControl = new FormControl<number>(new Date().getFullYear());
  salesChartSelectedMonth: FormControl = new FormControl<number>(new Date().getMonth());
  salesChartRef: any;
  salesMode: "month" | "year" = "month";

  // Appointments
  appointmentCountChartData: ChartData = {
    labels: [],
    datasets: []
  }
  appointmentCountDatasets: ChartDataset = {
    label: "Rendez-vous",
    backgroundColor: 'rgba(197,192,40,0.5)',
    borderColor: 'rgb(197,192,40)',
    pointBorderColor: 'rgba(197,192,40, 1)',
    pointBackgroundColor: '#fff',
    data: []
  }
  appointmentCountLabels: string[] = [];
  appointmentCountChartSelectedYear: FormControl = new FormControl<number>(new Date().getFullYear());
  appointmentCountChartSelectedMonth: FormControl = new FormControl<number>(new Date().getMonth());
  appointmentCountChartRef: any;
  appointmentCountMode: "month" | "year" = "month";

  // Working time
  workingTimeDisplayedColumns: string[] = ["name","email","workingTime"];
  workingTimeDataSource: WorkingTimeDto[] = []
  workingTimeSelectedYear: FormControl = new FormControl<number>(new Date().getFullYear());
  workingTimeSelectedMonth: FormControl = new FormControl<number>(new Date().getMonth());

  constructor(
    private statsService: StatsService
  ) {}

  ngOnInit() {
    this.years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);
    this.getSalesPerDay(this.salesChartSelectedYear.value, new Date().getMonth() + 1);
    this.getAppointmentsPerDay(this.appointmentCountChartSelectedYear.value, new Date().getMonth() + 1);
    this.getMeanWorkingTime(this.workingTimeSelectedYear.value, new Date().getMonth() + 1);
    merge(this.salesChartSelectedYear.valueChanges, this.salesChartSelectedMonth.valueChanges)
      .pipe(
        tap(() => {

          if(this.salesMode === "month") {
            this.getSalesPerDay(this.salesChartSelectedYear.value, parseInt(this.salesChartSelectedMonth.value) + 1);
          } else {
            this.getSalesPerMonth(this.salesChartSelectedYear.value);
          }
        })
      )
      .subscribe()
    merge(this.appointmentCountChartSelectedYear.valueChanges, this.appointmentCountChartSelectedMonth.valueChanges)
      .pipe(
        tap(() => {
          if(this.appointmentCountMode === "month") {
            this.getAppointmentsPerDay(this.appointmentCountChartSelectedYear.value, parseInt(this.appointmentCountChartSelectedMonth.value) + 1);
          } else {
            this.getAppointmentsPerMonth(this.appointmentCountChartSelectedYear.value);
          }
        })
      )
      .subscribe()
    merge(this.workingTimeSelectedYear.valueChanges, this.workingTimeSelectedMonth.valueChanges)
      .pipe(
        tap(() => {
          this.getMeanWorkingTime(this.workingTimeSelectedYear.value, parseInt(this.workingTimeSelectedMonth.value) + 1);
        })
      )
      .subscribe()
  }

  reloadSalesChartData() {
    this.salesChartData.labels = this.salesLabels;
    this.salesChartData.datasets = [];
    this.salesChartData.datasets.push(this.salesDatasets);
    this.salesChartRef.data = this.salesChartData;
    this.salesChartRef?.update();
  }

  reloadAppointmentChartData() {
    this.appointmentCountChartData.labels = this.appointmentCountLabels;
    this.appointmentCountChartData.datasets = [];
    this.appointmentCountChartData.datasets.push(this.appointmentCountDatasets);
    this.appointmentCountChartRef.data = this.appointmentCountChartData;
    this.appointmentCountChartRef?.update();
  }

  getSalesPerDay(year: number, month: number) {
    console.log(year, month)
    const daysInMonth = this.getDaysInMonth(year, month);
    this.salesLabels = Array.from({length: daysInMonth}, (_, i) => (i + 1).toString());
    this.statsService.getSalesPerDay(year, month).subscribe(sales => {
       this.salesDatasets.data = Array.from({length: daysInMonth}, (_, i) => {
          const day = i + 1;
          const salesForDay = sales.find(sale => sale.date?.day === day);
          return salesForDay?.sales || 0;
        });
        this.reloadSalesChartData();
    })
  }

  getSalesPerMonth(year: number) {
    this.salesLabels = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    this.statsService.getSalesPerMonth(year).subscribe(sales => {
      this.salesDatasets.data = Array.from({length: 12}, (_, i) => {
        const month = i + 1;
        const salesForMonth = sales.find(sale => sale.month?.month === month);
        return salesForMonth?.sales || 0;
      });
      this.reloadSalesChartData();
    })
  }

  getAppointmentsPerDay(year: number, month: number) {
    const daysInMonth = this.getDaysInMonth(year, month);
    this.appointmentCountLabels = Array.from({length: daysInMonth}, (_, i) => (i + 1).toString());
    this.statsService.getAppointmentsPerDay(year, month).subscribe(appointments => {
      this.appointmentCountDatasets.data = Array.from({length: daysInMonth}, (_, i) => {
        const day = i + 1;
        const appointmentsForDay = appointments.find(appointment => appointment.date?.day === day);
        return appointmentsForDay?.appointmentCount || 0;
      });
      this.reloadAppointmentChartData();
    })
  }

  getAppointmentsPerMonth(year: number) {
    this.appointmentCountLabels = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    this.statsService.getAppointmentsPerMonth(year).subscribe(appointments => {
      this.appointmentCountDatasets.data = appointments;
      this.reloadAppointmentChartData();
    })
  }

  getMeanWorkingTime(year: number, month: number) {
    this.statsService.getMeanWorkingTime(year, month).subscribe(workingTimes => {

      this.workingTimeDataSource = workingTimes;
    })
  }

  getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  getMonthName(month: number) {
    return this.capitalize(new Date(0, month).toLocaleString('default', { month: 'long' }));
  }

  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleSalesChartRef($chartRef: any) {
    if ($chartRef) {
      this.salesChartRef = $chartRef;
      console.log(this.salesChartRef)
    }
  }

  handleAppointmentCountChartRef($chartRef: any) {
    if ($chartRef) {
      this.appointmentCountChartRef = $chartRef;
    }
  }

  handleSalesModeChange(mode: "month" | "year") {
    this.salesMode = mode;
    if(mode === "month") {
      this.getSalesPerDay(this.salesChartSelectedYear.value, this.salesChartSelectedMonth.value + 1);
    } else {
      this.getSalesPerMonth(this.salesChartSelectedYear.value);
    }
  }

  handleAppointmentModeChange(mode: "month" | "year") {
    this.appointmentCountMode = mode;
    if(mode === "month") {
      this.getAppointmentsPerDay(this.appointmentCountChartSelectedYear.value, this.appointmentCountChartSelectedMonth.value + 1);
    } else {
      this.getAppointmentsPerMonth(this.appointmentCountChartSelectedYear.value);
    }
  }

  calculateWorkingTimeGeneralMean() {
    return this.workingTimeDataSource.reduce((acc, current) => acc + current.meanWorkingTime, 0) / this.workingTimeDataSource.length;
  }

}
