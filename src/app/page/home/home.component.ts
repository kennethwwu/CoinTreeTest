import { Component, OnInit, ViewChild } from '@angular/core';
import { CrytoPriceSeriveService } from '../../service/cryto-price-serive.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  lastPrice = {};
  currentPrice = {};

  @ViewChild('t') tooltip:NgbTooltip;
  bidPrice:number = 0;
  priceTrend:string = 'trending_flat';
  input1TooltipContent:string;
  isValid:boolean = true;
  bids:any[] = [];
  chartTime:string[];
  chartPrice:number[] = [];


  //chart setting
  lineChartData:any[] = [
    { data: [], label: 'BTC 24HR Price' },
  ];
  lineChartLabels:any[];
  lineChartOptions:any = {
    responsive: true,
    scales:{
      yAxes: [{
        ticks: {
            callback: function(value, index, values) {
                return '$' + value;
            }
        }
    }]
    },
    tooltips : {
      callbacks: {
        label: function(tooltipItem, data){
          return '$'+tooltipItem.yLabel
        }
       } 
    }
  };
  chartType:string = 'line';
  lineChartLegend:boolean = true;

  constructor(private Cryto:CrytoPriceSeriveService) { }

  ngOnInit() {
    this.loadBtcPrice();
    this.getBTCHisto();
  }

  loadBtcPrice(){
    this.Cryto.getCoinPrice('btc', 'aud').subscribe(res => {

      this.currentPrice = res;
      if(localStorage.getItem('lastPrice')){
        this.lastPrice = JSON.parse(localStorage.getItem('lastPrice'));
      }
      localStorage.setItem('lastPrice', JSON.stringify(res));
    }, error => {
      console.log(error);
    });
  }

  getTrendIcon(){
    if(Object.keys(this.lastPrice).length>0){
      if(this.currentPrice['spot'] > this.lastPrice['spot']){
        return 'trending_up';
      }
      if(this.currentPrice['spot'] < this.lastPrice['spot']){
        return 'trending_down';
      }
    }

    return 'trending_flat';
  }

  getPercentage(){
    if(Object.keys(this.lastPrice).length>0){
      return (this.currentPrice['spot']-this.lastPrice['spot'])/this.lastPrice['spot'];
    }
    return 0;
  }


  getBTCHisto(){
    this.Cryto.getBTCDailyHisto().subscribe(res=>{
      this.chartTime = res['Data'].map(x => moment.unix(x.time).format('HH:mm').toString());
      this.chartPrice = res['Data'].map(x => x.close);
      this.setChart();
    });
  }

  setChart(){
    this.lineChartData[0].data = this.chartPrice;
    this.lineChartLabels = this.chartTime;
  }

  chartHovered(e){

  }

  chartClicked(e){

  }


  pressToSubmit(e){
    if(e.keyCode == 13){

      this.submitBid();
    }
  }

  submitBid(){
    if(!this.currentPrice['spot']){
      return;
    }
    if(this.bidPrice > this.currentPrice['spot']){
      this.bids.push({time:moment().format('DD/MM/YY, HH:mm:ss').toString(), bidPrice:this.bidPrice});
      //do submit
      this.isValid = true;
      this.bidPrice = 0;
      if(this.tooltip.isOpen()){
        this.tooltip.close();
      }
    }else{
      if(!this.tooltip.isOpen()){
        this.tooltip.open();
      }
      this.isValid = false;
      this.input1TooltipContent = 'The Current Live Price is $'+this.currentPrice['spot'];
    }
  }

}
