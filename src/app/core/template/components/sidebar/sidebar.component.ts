import { Component, OnInit } from "@angular/core";

import { interval } from "rxjs/internal/observable/interval";
import { Subscription } from "rxjs";
import { startWith, switchMap } from "rxjs/operators";

import { ChatService } from "../../../services/messagerie/chat.service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/disponibilites",
    title: "Disponibilités",
    icon: "pe-7s-graph",
    class: "",
  },
  { path: "/recherche", title: "Recherche", icon: "pe-7s-graph", class: "" },
  { path: "/messagerie", title: "Messagerie", icon: "pe-7s-graph", class: "" },
  { path: "/historique", title: "Historique", icon: "pe-7s-graph", class: "" },
  { path: "/infos", title: "Mes informations", icon: "pe-7s-graph", class: "" },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  unread_messages: Number = 0;

  timeInterval: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.timeInterval = interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.chatService.getUnreadMessages())
      )
      .subscribe(
        (resp) => (this.unread_messages = resp),
        (err) => console.log("HTTP Error", err)
      );
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
