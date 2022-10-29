import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { NounouService } from 'app/core/services/nounou/nounou.service';
import { Nounou } from 'app/core/interfaces/nounou/nounou';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {
  email: string;
  pseudo: string;
  JSON: any = JSON;
  nounou: Nounou = {
    email: '',
    nom: '',
    prenom: '',
    adresse: '',
    numeroTelephone: '',
    pseudo: ''
  };
  nounouOld: Nounou = {
    email: '',
    nom: '',
    prenom: '',
    adresse: '',
    numeroTelephone: '',
    pseudo: ''
  };
  profileForm: FormGroup = this.formBuilder.group({
    nom: this.formBuilder.control('', Validators.required),
    prenom: this.formBuilder.control('', Validators.required),
    adresse: this.formBuilder.control('', Validators.required),
    numeroTelephone: this.formBuilder.control('', [Validators.required, Validators.pattern('^0\\d{9}$')])
  }, {
    updateOn: 'change'
  });

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private oAuthService: OAuthService,
    private nounouService: NounouService
  ) { }

  ngOnInit(): void {
    if (!this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.logOut();
    }
    else {
      this.email = this.oAuthService.getIdentityClaims()['email'];
      this.pseudo = this.oAuthService.getIdentityClaims()['preferred_username'];
      this.getNounouById(this.email);
    }
  }

  submitProfileForm() {
    if (this.profileForm.valid) {
      this.updateNounou(this.nounou.email, this.nounou);
    }
  }

  submitProfileForm() {
    if (this.profileForm.valid) {
      this.updateNounou(this.nounou.email, this.nounou);
    }
  }

  submitProfileForm() {
    if (this.profileForm.valid) {
      this.updateNounou(this.nounou.email, this.nounou);
    }
  }

  public getNounouById(email: string): void {
    this.nounouService.getNounouById(email).subscribe({
      next: (response: Nounou) => {
        this.nounou = response;
        this.nounouOld = { ...response };
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    });
  }

  public updateNounou(email: string, nounou: Nounou): void {
    this.nounouService.updateNounou(email, nounou).subscribe({
      next: (response: Nounou) => {
        this.toastr.success('Profile mis à jour avec succès');
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    });
  }
}
