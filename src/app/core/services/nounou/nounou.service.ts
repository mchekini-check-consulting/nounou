import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Nounou} from 'app/core/interfaces/nounou/nounou';

@Injectable({
  providedIn: 'root'
})
export class NounouService {

  constructor(private http: HttpClient) { }

  public getNounouById(email: string): Observable<Nounou> {
    return this.http.get<Nounou>('nounou-api/api/v1/nounou/getById/' + email);
  }

  public updateNounou(email: string, nounou: Nounou): Observable<Nounou> {
    return this.http.put<Nounou>(`"nounou-api/api/v1/nounou/update"`, nounou);
  }
}
