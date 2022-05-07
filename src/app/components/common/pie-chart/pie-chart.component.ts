import { Component, Input, ViewChild, OnInit, OnChanges } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import { BaseChartDirective } from "ng2-charts";
import DatalabelsPlugin from "chartjs-plugin-datalabels";

@Component({
    selector: "app-pie-chart",
    templateUrl: "./pie-chart.component.html",
    styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements OnInit {
    @Input() labels: (string | string[])[];
    @Input() values: number[];

    ngOnInit(): void {
        this.pieChartData = {
            labels: this.labels,
            datasets: [
                {
                    data: this.values,
                },
            ],
        };
        (this.chart as any)?.render();
    }

    @ViewChild(BaseChartDirective) chart: typeof BaseChartDirective | undefined;
    // Pie
    public pieChartOptions: ChartConfiguration["options"] = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            datalabels: {
                formatter: (value, ctx) => {
                    if (ctx.chart.data.labels) {
                        return ctx.chart.data.labels[ctx.dataIndex];
                    }
                },
            },
        },
    };

    public pieChartData: ChartData<"pie", number[], string | string[]> = {
        labels: [],
        datasets: [
            {
                data: [],
            },
        ],
    };
    public pieChartType: ChartType = "pie";
    public pieChartPlugins = [DatalabelsPlugin];
}
