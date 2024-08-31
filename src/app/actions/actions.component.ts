import { Component, computed, HostBinding, inject, output } from '@angular/core';
import { HandService } from '../services/hand.service';

@Component({
    selector: 'bj-actions',
    standalone: true,
    imports: [],
    templateUrl: './actions.component.html',
    styles: `
    .action, .split {
        padding: 0.5rem;
        text-align: center;
        min-width: 50%;
        color: white;
        border-radius: 6px;
        border-width: 3px;
        border-style: solid;
        font-size: 1.5rem;
    }
    .split {
        border-color: var(--c-charm);
        background-color: var(--c-charm);
    }
    `
})
export class ActionsComponent {
    hs = inject(HandService);
    reset = output();

    bc = computed(() => {
        switch (this.hs.action()) {
            case 'hit':
                return 'var(--c-goal-600)';

            case 'stand':
                return 'var(--c-main-600)';

            case 'double/stand':
                return 'var(--c-vice-600)';

            case 'double/hit':
                return 'var(--c-vice-600)';

            case 'blackjack':
                return 'var(--c-goal-600)';
        }
    });

    bg = computed(() => {
        switch (this.hs.action()) {
            case 'hit':
                return 'var(--c-goal)';

            case 'stand':
                return 'var(--c-main)';

            case 'double/stand':
                return 'var(--c-vice)';

            case 'double/hit':
                return 'var(--c-vice)';

            case 'blackjack':
                return 'var(--c-goal)';
        }
    });
}
