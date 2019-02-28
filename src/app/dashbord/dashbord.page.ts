import { Component, OnInit } from '@angular/core';
import {MediaVPage} from '../media-v/media-v.page'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.page.html',
  styleUrls: ['./dashbord.page.scss'],
})





export class DashbordPage implements OnInit {

  chatRoot = MediaVPage;
  panel1:boolean=true;
  panel2:boolean=false;
  panel3:boolean=false;

  constructor(public navCtrl: NavController) { }

  onTabSelected(panel){
    if (panel == '1'){
      this.panel1 = true;
      this.panel2 = false;
      this.panel3 = false;
    }else if (panel == '2'){
      this.panel1 = false;
      this.panel2 = true;
      this.panel3 = false;
    }else{
      this.panel1 = false;
      this.panel2 = false;
      this.panel3 = true;
    }
  }


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


//Chart Labels
public barChartLabels:string[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

//Chart data
public barChartData:any[] = [
  {data: [66, 55, 83, 82, 56, 51, 43], label: 'Loss'},
  {data: [29, 38, 40, 21, 82, 30, 89], label: 'Profit'}
];

 // Chart events
 public chartClicked(e:any):void {
  console.log(e);
}
 
// Chart events
public chartHovered(e:any):void {
  console.log(e);
}


  ngOnInit() {

    // this.useAngularLibrary();
  }

}
