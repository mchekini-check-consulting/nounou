import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: any[][];
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
            ['Lundi', false, false, false],
            ['Mardi', false, false, false],
            ['Mercredi', false, false, false],
            ['Jeudi', false, false, false],
            ['Vendredi', false, false, false],
            ['Samedi', false, false, false],
            ['Dimanche', false, false, false],
        ]
    };
  }

}
