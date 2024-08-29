import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './core/nav/nav.component';
import { HandService } from './services/hand.service';
import { BjStrategyService } from './services/bj-strategy.service';
import { filter, fromEvent, map, tap } from 'rxjs';
import { semenIcons, semenKeyCodes, valKeyCodes } from './services/deck';
import { draw } from './services/functions';

@Component({
    selector: 'bj-root',
    standalone: true,
    imports: [RouterOutlet, NavComponent],
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
                filter(code => {
                    if (code === 'Space' || code === 'Enter')
                        this.status.set('PLAYER');
                    return [...valKeyCodes, ...semenKeyCodes].includes(code);
                }),
                tap((code: string) => {
                    switch (this.status()) {
                        case 'DEALER':
                            this.hs.dealer.set(draw(code));
                            break;
                        case 'PLAYER':
                            this.hs.addCard(draw(code));
                            break;
                    }
                }),

            )
            .subscribe(_ => {
                console.log(_);
            });
    }


}

