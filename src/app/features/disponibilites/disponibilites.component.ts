import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Disponibilite } from 'app/core/interfaces/disponibilite/disponibilite.model';
import { DisponibiliteService } from 'app/core/services/disponibilite/disponibilite.service';

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
  disponibilite: Disponibilite = {
    id: null,
    jour: null,
    date_debut_matin: null,
    date_fin_matin: null,
    date_debut_midi: null,
    date_fin_midi: null,
    date_debut_soir: null,
    date_fin_soir: null,
    nounouId: null,
  };

  constructor(
    private oAuthService: OAuthService,
    private disponibiliteService: DisponibiliteService
    ) { }

  ngOnInit(): void {
    this.tableData = {
        headerRow: [ 'Jour', 'Matin', 'Midi', 'Soir'],
        dataRows: [
            { jour:'Lundi', matin: false, midi: false, soir: false },
            { jour:'Mardi', matin: false, midi: false, soir: false },
            { jour:'Mercredi', matin: false, midi: false, soir: false },
            { jour:'Jeudi', matin: false, midi: false, soir: false },
            { jour:'Vendredi', matin: false, midi: false, soir: false },
            { jour:'Samedi', matin: false, midi: false, soir: false },
            { jour:'Dimanche', matin: false, midi: false, soir: false },
        ]
    };
    if (!this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.logOut();
    }
    else {
      let email = this.oAuthService.getIdentityClaims()['email'];
      this.getDisponibiliteById(email);
    }
  }

  public getDisponibiliteById(email: string): void {
    this.disponibiliteService.getDisponibiliteById(email).subscribe({
      next: (response: Disponibilite[]) => {
        console.log(response)
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    });
  }

}
