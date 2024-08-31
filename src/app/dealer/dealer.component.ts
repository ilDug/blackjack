import { Component, inject, input } from '@angular/core';
import { HandService } from '../services/hand.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../core/card/card.component';

@Component({
    selector: 'bj-dealer',
    standalone: true,
    imports: [CommonModule, CardComponent],
    templateUrl: './dealer.component.html',
    styles: ``
})
export class DealerComponent {

    hs = inject(HandService);
    status = input.required<string>();

}
