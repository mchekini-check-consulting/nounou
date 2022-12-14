import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TemplateComponent } from "./core/template/container/template.component";
import { DisponibilitesComponent } from "./features/disponibilites/disponibilites.component";
import { RechercheComponent } from "./features/recherche/recherche.component";
import { MessagerieComponent } from "./features/messagerie/messagerie.component";
import { InfosComponent } from "./features/infos/infos.component";
import { HistoriqueComponent } from "./features/historique/historique.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { DisponibilitesCanDeactivateGuard } from "./core/guards/disponibilitesCanDeactivateGuard";

const routes: Routes = [
  {
    path: "",
    component: TemplateComponent,
    children: [
      {
        path: "disponibilites",
        component: DisponibilitesComponent,
        canDeactivate: [DisponibilitesCanDeactivateGuard],
      },
      {
        path: "recherche",
        component: RechercheComponent,
      },
      {
        path: "messagerie",
        component: MessagerieComponent,
      },
      {
        path: "infos",
        component: InfosComponent,
      },
      {
        path: "historique",
        component: HistoriqueComponent,
      },
    ],
  },
  { path: "**", component: TemplateComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
