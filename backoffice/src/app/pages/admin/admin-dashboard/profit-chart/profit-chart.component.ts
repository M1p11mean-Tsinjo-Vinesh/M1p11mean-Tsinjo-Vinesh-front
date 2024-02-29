import {Component, Input} from '@angular/core';
import {ChartData, ChartDataset, ChartOptions} from "chart.js";
import {FormControl} from "@angular/forms";
import {StatsService} from "../../../../services/stats/stats.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profit-chart',
  templateUrl: './profit-chart.component.html',
  styleUrls: ['./profit-chart.component.scss']
})
export class ProfitChartComponent {
  @Input()
  public closeLoading?: Function;

  years: number[] = []
  chartData: ChartData<"line"> = {
    labels: [],
    datasets: []
  }
  dataset: ChartDataset<"line"> = {
    label: "Bénéfices",
    backgroundColor: 'rgba(0,255,140,0.5)',
    borderColor: 'rgba(0,255,140, 1)',
    pointBorderColor: 'rgba(0,255,140, 1)',
    pointBackgroundColor: '#fff',
    data: []
  }
  labels: string[] = [];
  selectedYear: FormControl = new FormControl<number>(new Date().getFullYear());
  chartRef: any;
  options: ChartOptions<"line"> = {
    responsive:true,
    maintainAspectRatio: false,
  }
  totalPeriodProfit: number = 0;

  constructor(private statsService: StatsService) {
  }

  ngOnInit() {
    this.years = Array.from({length: 10}, (_, i) => new Date().getFullYear() - i);
    this.getProfitsByYear(this.selectedYear.value,true)

    this.selectedYear.valueChanges.subscribe((year) => {
      this.getProfitsByYear(year);
    })
  }

  reloadChartData() {
    this.chartData.labels = this.labels;
    this.chartData.datasets = [];
    this.chartData.datasets.push(this.dataset);
    if(this.chartRef) {
      this.chartRef.data = this.chartData;
      this.chartRef?.update();
    }
  }

  getProfitsByYear(year: number, closeLoading: boolean = false) {
    this.labels = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
    this.statsService.getProfitByYear(year).subscribe((data) => {
      this.dataset.data = data.result;
      this.totalPeriodProfit = data.total;
      this.reloadChartData()
      if (closeLoading) {
        this.closeLoading?.();
      }
    })
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.chartRef = $chartRef;
    }
  }

  getMonthProfitMean() {
    const data = this.dataset.data;
    const currentMonth = new Date().getMonth();
    let sum = 0;
    let count = 0;
    for (let i = 0; i <= currentMonth; i++) {
      sum += data[i] as number;
      count += 1;
    }
    return sum / count;
  }
}
