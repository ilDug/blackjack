import { Injectable, signal } from '@angular/core';
import { BjAction, BjActionMap, BjStrategy, mainStrategy } from './bj.strategy';
import { K, Q, J, A, TWO, THREE, FOUR, FIVE, SIX, ZERO, NINE, SEVEN, EIGHT, U, I, O, P, T } from "@angular/cdk/keycodes";

@Injectable({
    providedIn: 'root'
})
export class BjStrategyService {
    // current strategy
    strategy = signal<BjStrategy>(mainStrategy);

    // set the strategy to use
    setStrategy(s: BjStrategy) {
        this.strategy.set(s);
    }

    action(dealer: string, player: string): BjAction {
        const actions: BjActionMap = this.strategy()[dealer];
        return actions[player];
    }

}
