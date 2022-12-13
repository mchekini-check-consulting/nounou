import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { InfosIntervention } from "../../interfaces/historique/infosInterventions";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class InterventionService {
  constructor(private http: HttpClient) {}

  interventionApiUrl = "/api/v1/intervention";

  getAllInterventions(): Observable<InfosIntervention[]> {
    return this.http.get<InfosIntervention[]>(
      this.interventionApiUrl + "/get-all-interventions"
    );
  }

  rejectIntervention(data: string) {
    return this.http.put<any>(this.interventionApiUrl + "/reject", {
      emailFamille: data,
    });
  }

  confirmIntervention(data: string) {
    return this.http.put<any>(this.interventionApiUrl + "/confirm", {
      emailFamille: data,
    });
  }
}
