import { Component, computed, input, output } from '@angular/core';
import { semenTextMap } from '../../services/deck';

@Component({
    selector: 'bj-card',
    standalone: true,
    imports: [],
    templateUrl: './card.component.html',
    styles: ``
})
export class CardComponent {
    card = input.required<string>();
    remove = output();

    // indica se mostrare o meno il pulsante REMOVE
    locked = input<boolean>(false);


    // the suit of the card
    suit = computed(() => {
        const symbol = this.card().match(/♠|♣|♥|♦/g)?.[0] ?? '';
        return semenTextMap[symbol]
    });

    // the value of the card
    value = computed(() => this.card().replace(/♠|♣|♥|♦/g, ''));

}
