import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Disponibilite } from 'app/core/interfaces/disponibilite/disponibilite.model';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {
  private disponibiliteApiUrl = '/api/v1/disponibilites';

  constructor(private http: HttpClient) { }

  public getDisponibiliteById(email: string): Observable<Disponibilite[]> {
    return this.http.get<Disponibilite[]>(`${this.disponibiliteApiUrl}/${email}`);
  }
}
