import { computed, Injectable, signal } from '@angular/core';
import { semenIcons } from './deck';

@Injectable({
    providedIn: 'root'
})
export class HandService {
    hand = signal<string[]>(null);
    ace = computed<boolean>(() => this.hand().includes('A'));
    rawHand = computed(() => this.hand().map(card => card.replace(/♠|♣|♥|♦/g, '')));

    value = computed<number>(() => {
        const sum = this.rawHand().reduce((acc, card) => {
            if (card === 'A') {
                return acc + 11;
            }
            if (['K', 'Q', 'J'].includes(card)) {
                return acc + 10;
            }
            return acc + parseInt(card, 10);
        }, 0);

        return (sum > 21 && this.ace()) ? sum - 10 : sum;
    });

    code = computed<string>(() => {
        const num = this.rawHand()
            .filter(card => card !== 'A')
            .map(card => card.replace(/J|Q|K/, '10'))
            .map(card => parseInt(card, 10))
            .reduce((acc, card) => acc + card, 0);

        return this.ace() ? `A${num}` : `${num}`;
    });

    reset() {
        this.hand.set(null);
    }

    addCard(card: string) {
        this.hand.update(cards => [...this.hand(), card]);
    }
}
