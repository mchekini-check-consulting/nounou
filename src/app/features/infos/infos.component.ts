import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NounouService } from 'app/core/services/nounou/nounou.service';
import { Nounou } from 'app/core/interfaces/nounou/nounou';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {
  nounou: Nounou = {
    email: '',
    nom: '',
    prenom: '',
    adresse: '',
    numeroTelephone: '',
    pseudo: ''
  };

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private nounouService: NounouService
  ) { }

  ngOnInit(): void {
    this.oidcSecurityService.userData$.subscribe({
      next: (response) => {
        this.nounou.email = response.userData.email;
        this.nounou.pseudo = response.userData.preferred_username;
        this.nounou.nom = response.userData.family_name;
        this.nounou.prenom = response.userData.given_name;
        this.getNounouById(response.userData.email);
      }
    });
  }

  public getNounouById(email: string): void {
    this.nounouService.getNounouById(email).subscribe({
      next: (response: Nounou) => {
        this.nounou.numeroTelephone = response.numeroTelephone;
        this.nounou.adresse = response.adresse;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    });
  }

}
