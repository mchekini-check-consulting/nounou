import { Component, OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { InfosIntervention } from "app/core/interfaces/historique/infosInterventions";
import { InterventionService } from "app/core/services/historique/historique.service";

import { ToastrService } from "ngx-toastr";

import { interval } from "rxjs/internal/observable/interval";
import { Subscription } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";

@Component({
  selector: "app-historique",
  templateUrl: "./historique.component.html",
  styleUrls: ["./historique.component.scss"],
})
export class HistoriqueComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    private interventionService: InterventionService,
    private toastr: ToastrService
  ) {}

  listAllInterventions: InfosIntervention[] = [];

  timeInterval: Subscription;

  displayedColumns: string[] = ["position", "name", "weight", "symbol"];

  ngOnInit(): void {
    this.timeInterval = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.interventionService.getAllInterventions())
      )
      .subscribe(
        (resp) => (this.listAllInterventions = [...resp]),
        (err) => console.log("HTTP Error", err)
      );
  }

  getAllInterventions(): void {
    this.interventionService.getAllInterventions().subscribe((resp) => {
      this.listAllInterventions = [...resp];
    });
  }

  actionRejeter(email: string): void {
    if (
      window.confirm("Etes vous sûr de rejeter la demande d'intervention ?")
    ) {
      this.interventionService.rejectIntervention(email).subscribe((resp) => {
        this.listAllInterventions = [...resp];
      });
    }
  }

  actionConfirmer(email: string): void {
    if (
      window.confirm("Etes vous sûr de confirmer la demande d'intervention ?")
    ) {
      this.interventionService.confirmIntervention(email).subscribe((resp) => {
        this.listAllInterventions = [...resp];
      });
    }
  }

  actionRenouveler(): void {
    this.toastr.success("Action effectuée avec succès !");
  }
}
