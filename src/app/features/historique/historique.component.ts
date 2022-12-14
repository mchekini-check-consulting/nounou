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

  expanded: stateExpand[] = [];

  timeInterval: Subscription;

  displayedColumns: string[] = ["position", "name", "weight", "symbol"];

  afterCollapse(email: string): void {
    const index = this.expanded.findIndex((exp) => exp.email == email);
    if (index == -1) return;
    this.expanded[index].state = false;
  }

  afterExpand(email: string): void {
    const index = this.expanded.findIndex((exp) => exp.email == email);
    if (index == -1) return;
    this.expanded[index].state = true;
  }

  isExpand(email: string): boolean {
    console.log(this.expanded);
    const index = this.expanded.findIndex((exp) => exp.email == email);
    if (index == -1) return false;
    console.log(this.expanded[index].state);
    return this.expanded[index].state;
  }

  ngOnInit(): void {
    this.getAllInterventions();
    this.timeInterval = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.interventionService.getAllInterventions())
      )
      .subscribe(
        (resp) => (
          (this.listAllInterventions = [...resp]), this.setStateExpand(resp)
        ),
        (err) => console.log("HTTP Error", err)
      );
  }

  setStateExpand(resp: InfosIntervention[]): void {
    // Vérifier pour les nouvelles insertions d'interventions
    resp.map((e) => {
      if (!this.expanded.find((exp) => exp.email == e.emailFamille)) {
        this.expanded.push({ email: e.emailFamille, state: false });
      }
    });
  }

  getAllInterventions(): void {
    this.interventionService.getAllInterventions().subscribe((resp) => {
      this.listAllInterventions = [...resp];
      this.setStateExpand(resp);
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

interface stateExpand {
  email: string;
  state: boolean;
}
