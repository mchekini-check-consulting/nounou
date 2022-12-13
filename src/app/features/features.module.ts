import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DisponibilitesComponent } from "./disponibilites/disponibilites.component";
import { RechercheComponent } from "./recherche/recherche.component";
import { MessagerieComponent } from "./messagerie/messagerie.component";
import { HistoriqueComponent } from "./historique/historique.component";
import { InfosComponent } from "./infos/infos.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [
    DisponibilitesComponent,
    RechercheComponent,
    MessagerieComponent,
    HistoriqueComponent,
    InfosComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
  ],
})
export class FeaturesModule {}
