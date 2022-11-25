import { HttpErrorResponse } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { OAuthService } from 'angular-oauth2-oidc'
import { Disponibilite } from 'app/core/interfaces/disponibilite/disponibilite.model'
import { DisponibiliteService } from 'app/core/services/disponibilite/disponibilite.service'
import { ToastrService } from 'ngx-toastr'
import * as _ from 'lodash'

const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

declare interface TableRow {
  jour: string
  matin: boolean
  midi: boolean
  soir: boolean
}

declare interface TableData {
  headerRow: string[]
  dataRows: TableRow[]
}

@Component({
  selector: 'app-disponibilites',
  templateUrl: './disponibilites.component.html',
  styleUrls: ['./disponibilites.component.scss']
})
export class DisponibilitesComponent implements OnInit {
  emptyTable: TableData = {
    headerRow: ['', 'Matin', 'Midi', 'Soir'],
    dataRows: [
      { jour: 'Dimanche', matin: false, midi: false, soir: false },
      { jour: 'Lundi', matin: false, midi: false, soir: false },
      { jour: 'Mardi', matin: false, midi: false, soir: false },
      { jour: 'Mercredi', matin: false, midi: false, soir: false },
      { jour: 'Jeudi', matin: false, midi: false, soir: false },
      { jour: 'Vendredi', matin: false, midi: false, soir: false },
      { jour: 'Samedi', matin: false, midi: false, soir: false },
    ]
  }
  tableData: TableData = _.cloneDeep(this.emptyTable)
  tableDataOld: TableData = _.cloneDeep(this.emptyTable)

  constructor(
    private toastr: ToastrService,
    private oAuthService: OAuthService,
    private disponibiliteService: DisponibiliteService
  ) { }

  ngOnInit(): void {
    this.getDisponibiliteByNounouId(this.getNounouId())
  }

  didDataChange(): boolean {
    return _.isEqual(this.tableData, this.tableDataOld)
  }

  isTableEmpty(): boolean {
    return _.isEqual(this.tableData, this.emptyTable)
  }

  getNounouId(): string {
    let nounouId = null
    if (!this.oAuthService.hasValidAccessToken()) {
      this.oAuthService.logOut()
    }
    else {
      nounouId = this.oAuthService.getIdentityClaims()['email']
    }
    return nounouId
  }

  onSave(): void {
    if (this.isTableEmpty()) {
      this.toastr.error('Oups ! Il faut déclarer au minimum une disponibilité avant d\'enregistrer')
    }
    else {
      const email = this.getNounouId()
      if (email) {
        let date = new Date()
        let disponibilites = []
        this.tableData.dataRows.forEach(dataRow => {
          let currentDay = DAYS.indexOf(dataRow.jour)
          let newDate = new Date(date.setDate(date.getDate() - date.getDay() + currentDay))
          disponibilites.push({
            id: 0,
            jour: currentDay,
            date_debut_matin: !dataRow.matin ? '' : new Date(newDate.setHours(7, 0, 0, 0)),
            date_fin_matin: !dataRow.matin ? '' : new Date(newDate.setHours(12, 0, 0, 0)),
            date_debut_midi: !dataRow.midi ? '' : new Date(newDate.setHours(12, 0, 0, 0)),
            date_fin_midi: !dataRow.midi ? '' : new Date(newDate.setHours(17, 0, 0, 0)),
            date_debut_soir: !dataRow.soir ? '' : new Date(newDate.setHours(17, 0, 0, 0)),
            date_fin_soir: !dataRow.soir ? '' : new Date(newDate.setHours(22, 0, 0, 0)),
            nounouId: email
          })
        })
        this.updateDisponibiliteByNounouId(disponibilites)
      }
    }
  }

  onCancel(): void {
    this.tableData = JSON.parse(JSON.stringify(this.tableDataOld))
  }

  onDelete(): void {
    if (confirm('Voulez-vous vraiment supprimer toutes vos disponibilités ?')) {
      this.deleteDisponibiliteByNounouId()
    }
  }

  getDisponibiliteByNounouId(email: string): void {
    this.disponibiliteService.getDisponibiliteByNounouId(email).subscribe({
      next: (response: Disponibilite[]) => {
        let temp = []
        response.forEach(elt => {
          temp.push({
            jour: DAYS[elt.jour],
            matin: elt.date_debut_matin && elt.date_fin_matin ? true : false,
            midi: elt.date_debut_midi && elt.date_fin_midi ? true : false,
            soir: elt.date_debut_soir && elt.date_fin_soir ? true : false,
          })
        })
        if (temp.length !== 0) {
          this.tableData.dataRows = _.cloneDeep(temp)
          this.tableDataOld.dataRows = _.cloneDeep(temp)
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message)
      }
    })
  }

  updateDisponibiliteByNounouId(body: Disponibilite[]): void {
    this.disponibiliteService.updateDisponibiliteByNounouId(body).subscribe({
      next: (response: Disponibilite[]) => {
        this.tableDataOld = _.cloneDeep(this.tableData)
        this.toastr.success('Disponibilités enregistrées avec succès')
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message)
        this.toastr.error('Il y a eu un souci lors de l\'enregistrement de vos Disponibilités')
      }
    })
  }

  deleteDisponibiliteByNounouId() {
    this.disponibiliteService.deleteDisponibiliteByNounouId().subscribe({
      next: () => {
        this.tableData = _.cloneDeep(this.emptyTable)
        this.tableDataOld = _.cloneDeep(this.emptyTable)
        this.toastr.success('Disponibilités supprimées avec succès')
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message)
        this.toastr.error('Il y a eu un souci lors de la suppression de vos Disponibilités')
      }
    })
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
