import { CanDeactivate, UrlTree } from '@angular/router';
import { DisponibilitesComponent } from '../../features/disponibilites/disponibilites.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'app/features/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
    providedIn: 'root',
})
export class DisponibilitesCanDeactivateGuard implements CanDeactivate<DisponibilitesComponent> {
    constructor(
        private dialog: MatDialog
    ) { }

    canDeactivate(
        component: DisponibilitesComponent
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (!component.didDataChange()) {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                width: '35%',
                height: '25%',
                hasBackdrop: true,
                data: {
                    title: 'Attention !',
                    content: 'Vous allez perdre vos données ! Voulez-vous continuer ?'
                }
            })
            return dialogRef.afterClosed()
        }
        return of(true)
    }
}