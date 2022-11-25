import { Component, OnInit } from '@angular/core';

declare interface TableRow {
  jour: string;
  matin: boolean;
  midi: boolean;
  soir: boolean;
}

declare interface TableData {
  headerRow: string[];
  dataRows: TableRow[];
}

@Component({
  selector: 'app-disponibilites',
  templateUrl: './disponibilites.component.html',
  styleUrls: ['./disponibilites.component.scss']
})
export class DisponibilitesComponent implements OnInit {
  public tableData: TableData;

  constructor() { }

  ngOnInit(): void {
    this.tableData = {
        headerRow: [ 'Jour', 'Matin', 'Midi', 'Soir'],
        dataRows: [
            {
              jour:'Lundi', 
              matin: false,
              midi: false, 
              soir: false
            },
            {
              jour:'Mardi', 
              matin: false,
              midi: false, 
              soir: false
            },
            {
              jour:'Mercredi', 
              matin: false,
              midi: false, 
              soir: false
            },
            {
              jour:'Jeudi', 
              matin: false,
              midi: false, 
              soir: false
            },
            {
              jour:'Vendredi', 
              matin: false,
              midi: false, 
              soir: false
            },
            {
              jour:'Samedi', 
              matin: false,
              midi: false, 
              soir: false
            },
            {
              jour:'Dimanche', 
              matin: false,
              midi: false, 
              soir: false
            },
        ]
    };
  }

  printData(): void {
    console.log(this.tableData);
  }

}
