import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DisponibilitesComponent } from './disponibilites/disponibilites.component';
import { RechercheComponent } from './recherche/recherche.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { HistoriqueComponent } from './historique/historique.component';
import { InfosComponent } from './infos/infos.component';

@NgModule({
    declarations: [
        DisponibilitesComponent,
        RechercheComponent,
        MessagerieComponent,
        HistoriqueComponent,
        InfosComponent
    ],

    imports: [
        CommonModule
    ]
})
export class FeaturesModule {

}
