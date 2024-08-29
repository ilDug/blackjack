import { computed, Injectable, signal } from '@angular/core';
import { semenIcons } from './deck';

@Injectable({
    providedIn: 'root'
})
export class HandService {
    dealer = signal<string>(null);
    hand = signal<string[]>([]);
    rawHand = computed(() => this.hand().map(card => card.replace(/♠|♣|♥|♦/g, '')));
    ace = computed<boolean>(() => this.rawHand().includes('A'));
    aces = computed<boolean>(() => this.rawHand().filter(card => card === 'A').length > 1);

    value = computed<number>(() => {
        const sum = this.rawHand().reduce((acc, card) => {
            if (card === 'A' && !this.aces()) {
                return acc + 11;
            }
            if (card === 'A' && this.aces()) {
                return acc + 1;
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

        return this.ace() ? `A,${num}` : `${num}`;
    });

    reset() {
        this.hand.set([]);
        this.dealer.set(null);
    }

    addCard(card: string) {
        this.hand.update(cards => [...cards, card]);
    }
}
