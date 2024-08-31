import { Component, inject, input } from '@angular/core';
import { HandService } from '../services/hand.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'bj-player',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './player.component.html',
    styles: ``
})
export class PlayerComponent {
    hs = inject(HandService);
    status = input.required<string>();
}
