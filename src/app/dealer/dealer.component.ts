import { Component, inject, input } from '@angular/core';
import { HandService } from '../services/hand.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'bj-dealer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dealer.component.html',
    styles: ``
})
export class DealerComponent {

    hs = inject(HandService);
    status = input.required<string>();

}
