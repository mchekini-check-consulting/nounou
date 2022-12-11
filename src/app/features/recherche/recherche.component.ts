import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: "app-recherche",
  templateUrl: "./recherche.component.html",
  styleUrls: ["./recherche.component.scss"],
})
export class RechercheComponent implements AfterViewInit {
  myForm = new FormGroup({
    nom: new FormControl(""),
    prenom: new FormControl(""),
    ville: new FormControl(""),
    jour: new FormControl(""),
    heureDebut: new FormControl(""),
    heureFin: new FormControl(""),
  });

  data: Famille[] = [];

  displayedColumns: string[] = [
    "nom",
    "prenom",
    "adresse",
    "telephone",
    "mail",
    "contact",
  ];
  dataSource = new MatTableDataSource<Famille>(this.data);

  jours: string[] = [
    'Samedi',
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi'
  ];

  constructor(
    private http: HttpClient,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.searchNounouByCriteria();
  }

  ngOnInit(): void { }

  searchNounouByCriteria():void {
    const nom = this.myForm.get("nom").value;
    const prenom = this.myForm.get("prenom").value;
    const ville = this.myForm.get("ville").value;
    const jour = this.myForm.get("jour").value === '' ? -1 : this.myForm.get("jour").value;
    const heureDebut = this.myForm.get("heureDebut").value;
    const heureFin = this.myForm.get("heureFin").value;
    if (heureDebut && heureFin && heureFin < heureDebut) {
      this.toastr.error("L'heure de fin ne peut pas être inférieure à l'heure de début")
      return
    }
    this.http
      .get<Famille[]>(
        "api/v1/search/famille?nom=" +
        nom +
        "&prenom=" +
        prenom +
        "&ville=" +
        ville +
        "&jour=" +
        jour +
        "&heureDebut=" +
        heureDebut +
        "&heureFin=" +
        heureFin
      )
      .subscribe((resp) => {
        this.data = resp;
        this.dataSource = new MatTableDataSource<Famille>(this.data);
      });
  }

  goToChat(email: string): void {
    this._router.navigate(["/messagerie", email]);
  }
}

export interface Famille {
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  mail: string;
}
