import { computed, Injectable, signal } from '@angular/core';
import { semenIcons } from './deck';
import { BjActionMap, mainStrategy, splitStrategy } from './bj.strategy';

@Injectable({
    providedIn: 'root'
})
export class HandService {
    // la mano del dealer
    dealer = signal<string>('');

    // la mano del giocatore: array di symbols
    hand = signal<string[]>([]);

    // la mano del giocatore senza semi (♠|♣|♥|♦): array di symbols
    private rawHand = computed(() => this.hand().map(card => card.replace(/♠|♣|♥|♦/g, '')));

    // se la mano contiene un asso
    private ace = computed<boolean>(() => this.rawHand().includes('A'));

    // numero degl iassi
    private aces = computed<number>(() => this.rawHand().filter(card => card === 'A').length);

    // somma senza considerare gli assi
    private valueWOAces = computed<number>(() => {
        return this.rawHand()
            .filter(card => card !== 'A')
            .map(card => card.replace(/J|Q|K/, '10'))
            .map(card => parseInt(card, 10))
            .reduce((acc, card) => acc + card, 0);
    });


    /**
     * # somma degli assi
     * 
     * tutte le combinazioni di 11 o 1 per ogni asso presente
     * raggruppate in un array di possibili somme.
     * 
     * ```11 * (numero di assi - i) + 1 * i```
     */
    private acesValues = computed<number[]>(() => {
        const acesSum: number[] = [];
        for (let i = 0; i <= this.aces(); i++) {
            const val = 11 * (this.aces() - i) + 1 * i;
            acesSum.push(val);
        }
        return acesSum;
    });


    // somma dei valori delle carte
    value = computed<number>(() => {
        //  ultimo valore dell'array
        const min = this.acesValues()[this.acesValues().length - 1] ?? 0;

        // somma totale
        const sum = this.acesValues()
            .map(val => val + this.valueWOAces())
            .find(val => val <= 21)
            ?? // se non trova nessun valore <= 21, prende l'ultimo valore dell'array e lo somma al valore senza assi
            this.valueWOAces() + min;

        return sum;
    });


    /**
    * somma dei valori delle carte tranne l'asso indicato separatamente ( A,10 | A,6)
    * per poter scegliere la riga corrispondente della strategia 
    */
    code = computed<string>(() => !this.ace() ? `${this.value()}` : `A,${this.value() - 11}`);

    // se la mano è blackjack
    bj = computed<boolean>(() => this.value() === 21 && this.rawHand().length === 2);

    // se la mano è bust
    bust = computed<boolean>(() => this.value() > 21);


    // azzera la mano
    reset() {
        this.hand.set([]);
        this.dealer.set('');
    }

    // aggiunge una carta alla mano
    addCard(card: string) {
        this.hand.update(cards => [...cards, card]);
    }

    removeCard(index: number) {
        this.hand.update(cards => [...cards.filter((_, i) => i !== index)]);
    }


    // la prossima azione da compiere
    action = computed<string>(() => {
        const d = this.dealer().replace(/♠|♣|♥|♦/g, '').replace(/J|Q|K/, '10');
        const actions: BjActionMap = mainStrategy[d] ?? {};
        return actions[this.code()] ?? "";
    });

    split = computed<boolean>(() => {
        if (this.rawHand().length !== 2) return false;
        if (this.rawHand()[0] != this.rawHand()[1]) return false;
        const couple = this.rawHand()[0];
        const d = this.dealer().replace(/♠|♣|♥|♦/g, '').replace(/J|Q|K/, '10');
        return splitStrategy[d][couple] ?? false;
    });
}
