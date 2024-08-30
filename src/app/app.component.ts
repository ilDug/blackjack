import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/nav/nav.component';
import { HandService } from './services/hand.service';
import { BjStrategyService } from './services/bj-strategy.service';
import { filter, fromEvent, map, tap } from 'rxjs';
import { semenIcons, semenKeyCodes, valKeyCodes } from './services/deck';
import { draw } from './services/functions';
import { JsonPipe } from '@angular/common';

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

    constructor() {
        fromEvent(document, 'keydown')
            .pipe(
                map((event: KeyboardEvent) => event.code),

                // se si preme spazio o invio, cambia lo stato del gioco da DEALER a PLAYER
                tap((code: string) => {
                    if (code === 'Space' || code === 'Enter') this.status.set('PLAYER');
                }),

                // filtra solo i tasti che corrispondono a quelli delle carte
                filter((code: string) => {
                    return [...valKeyCodes, ...semenKeyCodes].includes(code);
                }),

                //  passa il symbolo alla funzione draw per ottenere il codice della carta
                map((code: string) => draw(code)),
            )
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


}

