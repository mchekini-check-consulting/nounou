import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Messages } from "../../interfaces/messagerie/messages";
import { Famille } from "../../interfaces/famille/famille";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private chatApiUrl = "/api/v1/chat";

  constructor(private http: HttpClient) {}

  getChatFamille(): Observable<Messages[]> {
    return this.http.get<Messages[]>(this.chatApiUrl + "/get");
  }

  sendChatFamille(data: Messages) {
    return this.http.post<Messages>(this.chatApiUrl + "/send", data);
  }

  getListFamilles(): Observable<Famille[]> {
    return this.http.get<Famille[]>(
      "api/v1/search/famille?nom=&prenom=&ville="
    );
  }
}
