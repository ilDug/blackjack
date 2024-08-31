import { Component, computed, input } from '@angular/core';
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

    // the suit of the card
    suit = computed(() => {
        const symbol = this.card().match(/♠|♣|♥|♦/g)?.[0] ?? '';
        return semenTextMap[symbol]
    });

    // the value of the card
    value = computed(() => this.card().replace(/♠|♣|♥|♦/g, ''));

}
