import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import * as c3 from 'c3'
import { FirebaseService } from '../firebase.service';
import { ModalController } from '@ionic/angular';
import { ModalPageComponent } from '../modal-page/modal-page.component';
@Component({
    selector: 'app-aire',
    templateUrl: './aire.page.html',
    styleUrls: ['./aire.page.scss'],
})
export class AirePage {


    @ViewChild('chartTemp', { static: false }) chartTemp;
    bars: any;
    colorArray: any;
    // tslint:disable-next-line: variable-name
    chart_gauge: any;
    calidadAire: any;
    air: any;
    servicio: any;
    constructor(private ioTService: FirebaseService, private modalController: ModalController) {
        this.ioTService.getServices().
        subscribe((res) => {
            console.log(res);
            this.servicio = res;
        });
    }
    cargarGauge(servicio: any) {
        this.ioTService.getAirQuality(servicio).subscribe((res) => {
            console.log(res);
            this.createGauge(res);
        });
    }

    ionViewDidEnter() {
        this.createGauge();
    }

    // createChartTemp() {
    //     this.bars = new Chart(this.chartTemp.nativeElement, {
    //         type: 'line',
    //         data: {
    //             labels: ['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM'],
    //             datasets: [{
    //                 label: 'Por Hora',
    //                 data: [65, 20, 40, 15, 77, 90],
    //                 backgroundColor: [
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)'
    //                 ],
    //                 borderColor: [
    //                     'rgba(54, 162, 235, 1)',
    //                     'rgba(54, 162, 235, 1)',
    //                     'rgba(54, 162, 235, 1)',
    //                     'rgba(54, 162, 235, 1)',
    //                     'rgba(54, 162, 235, 1)',
    //                     'rgba(54, 162, 235, 1)'
    //                 ],
    //                 borderWidth: 1
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 yAxes: [{
    //                     ticks: {
    //                         beginAtZero: true
    //                     }
    //                 }]
    //             }
    //         }
    //     });
    // }

    // se muestra el gaugue
     createGauge(dato: any = 45) {
        this.chart_gauge = c3.generate({
            bindto: '#chart_gauge',
            data: {
                columns: [
                    ['Calidad', dato]
                ],
                type: 'gauge',
                onclick(d, i) { console.log('onclick', d, i); },
                onmouseover(d, i) { console.log('onmouseover', d, i); },
                onmouseout(d, i) { console.log('onmouseout', d, i); }
            },
            gauge: {
                label: {
                    format(value, ratio) {
                        return value;
                    },
                    show: false // to turn off the min/max labels.
                },
                min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
                max: 200, // 100 is default
                units: ' %',
                width: 39 // for adjusting arc thickness
            },
            color: {

                pattern: ['#60B044', '#F6C600', '#F97600', '#FF0000'], // the three color levels for the percentage values.
                threshold: {
                    values: [51, 101, 121, 151]
                }
            },
            size: {
                height: 180
            }
        });
    }




}
