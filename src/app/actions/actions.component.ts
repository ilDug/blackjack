import { Component, computed, HostBinding, inject, output } from '@angular/core';
import { HandService } from '../services/hand.service';

@Component({
    selector: 'bj-actions',
    standalone: true,
    imports: [],
    templateUrl: './actions.component.html',
    styles: `
    .action {
        padding: 0.5rem;
        text-align: center;
        min-width: 50%;
        color: white;
        border-radius: 6px;
        border-width: 3px;
        border-style: solid;
        font-size: 1.5rem;
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

            case 'split/hit':
                return 'var(--c-charm-600)';

            case 'split/stand':
                return 'var(--c-charm-600)';

            case 'surrender':
                return 'var(--c-alter-600)';

            case 'insurance':
                return 'var(--c-warn-600)';

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

            case 'split/hit':
                return 'var(--c-charm)';

            case 'split/stand':
                return 'var(--c-charm)';

            case 'surrender':
                return 'var(--c-alter)';

            case 'insurance':
                return 'var(--c-warn)';

            case 'blackjack':
                return 'var(--c-goal)';
        }
    });
}
