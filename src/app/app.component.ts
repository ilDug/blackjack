import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/nav/nav.component';
import { HandService } from './services/hand.service';
import { BjStrategyService } from './services/bj-strategy.service';
import { filter, fromEvent, map, tap } from 'rxjs';
import { semenIcons, semenKeyCodes, valKeyCodes } from './services/deck';
import { JsonPipe } from '@angular/common';
import { keyboardPipe } from './services/functions';

@Component({
    selector: 'bj-root',
    standalone: true,
    imports: [RouterOutlet, NavComponent, JsonPipe],
    templateUrl: './app.component.html',
    styles: [],
})
export class AppComponent {

    hs = inject(HandService);
    ss = inject(BjStrategyService);
    status = signal<string>('DEALER');
    action = signal<string>('');

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
                        const a = this.ss.action(this.hs.dealer().replace(/♠|♣|♥|♦/g, ''), this.hs.code());
                        this.action.set(a);
                        break;
                }
            });
    }

    //  azione del giocatore


    reset() {
        this.hs.reset();
        this.status.set('DEALER');
    }


}

