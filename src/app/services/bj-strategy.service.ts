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

    // getCard(keyboardCode: number): string {
    //     switch (keyboardCode) {
    //         case TWO:
    //             return "2";
    //         case THREE:
    //             return "3";
    //         case FOUR:
    //             return "4";
    //         case FIVE:
    //             return "5";
    //         case SIX:
    //             return "6";
    //         case SEVEN:
    //             return "7";
    //         case EIGHT:
    //             return "8";
    //         case NINE:
    //             return "9";
    //         case ZERO:
    //             return "10";
    //         case J:
    //             return "10";
    //         case Q:
    //             return "10";
    //         case K:
    //             return "10";
    //         case A:
    //             return "A";
    //     }
    // }
}
