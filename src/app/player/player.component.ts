import { Component, inject, input } from '@angular/core';
import { HandService } from '../services/hand.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../core/card/card.component';

@Component({
    selector: 'bj-player',
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: './player.component.html',

})
export class PlayerComponent {
    hs = inject(HandService);
    status = input.required<string>();

    removeCard(i: number) {
        this.hs.removeCard(i);
    }
}
