import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/nav/nav.component';
import { HandService } from './services/hand.service';
import { filter, fromEvent, map, tap } from 'rxjs';
import { semenIcons, semenKeyCodes, valKeyCodes } from './services/deck';
import { JsonPipe } from '@angular/common';
import { keyboardPipe } from './services/functions';
import { DealerComponent } from './dealer/dealer.component';
import { PlayerComponent } from './player/player.component';
import { ActionsComponent } from './actions/actions.component';

@Component({
    selector: 'bj-root',
    standalone: true,
    imports: [RouterOutlet, NavComponent, JsonPipe, DealerComponent, PlayerComponent, ActionsComponent],
    templateUrl: './app.component.html',
    styles: [],
})
export class AppComponent {

    hs = inject(HandService);
    status = signal<string>('DEALER');

    constructor() {
        fromEvent(document, 'keydown')
            .pipe(keyboardPipe(this.status))
            .subscribe((symbol: string) => {
                //  a seconda dello stato del gioco, aggiorna la mano del giocatore o quella del dealer
                switch (this.status()) {
                    case 'DEALER':
                        this.hs.dealer.set(symbol);
                        break;
                    case 'PLAYER':
                        this.hs.addCard(symbol);
                        break;
                }
            });
    }

    // resetta il gioco
    reset() {
        this.hs.reset();
        this.status.set('DEALER');
    }


}

