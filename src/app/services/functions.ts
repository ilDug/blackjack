import { filter, fromEvent, map, pipe, tap } from 'rxjs';
import { keyboardSymbols, semenIcons, semenKeyCodes, valKeyCodes } from './deck';
import { WritableSignal } from '@angular/core';

/** from keyboard to card symbol */
export function draw(keycode: string): string {
    return keyboardSymbols[keycode];
}

// keyboard pipe
export const keyboardPipe = (status: WritableSignal<string>) => pipe(
    map((event: KeyboardEvent) => event.code),

    // se si preme spazio o invio, cambia lo stato del gioco da DEALER a PLAYER
    tap((code: string) => {
        if (code === 'Space' || code === 'Enter') status.set('PLAYER');
    }),

    // filtra solo i tasti che corrispondono a quelli delle carte
    filter((code: string) => {
        return [...valKeyCodes, ...semenKeyCodes].includes(code);
    }),

    //  passa il symbolo alla funzione draw per ottenere il codice della carta
    map((code: string) => draw(code)),

    // randomly compide the symbols with a semen
    map((symbol: string) => {
        const random = Math.floor(Math.random() * semenIcons.length);
        return status() === 'PLAYER' ? symbol + semenIcons[random] : symbol;
    }),
)
