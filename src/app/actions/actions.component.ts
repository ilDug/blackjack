import { Component, inject, output } from '@angular/core';
import { HandService } from '../services/hand.service';

@Component({
    selector: 'bj-actions',
    standalone: true,
    imports: [],
    templateUrl: './actions.component.html',
    styles: ``
})
export class ActionsComponent {
    hs = inject(HandService);
    reset = output();
}
