import { keyboardSymbols } from './deck';

/** from keyboard to card symbol */
export function draw(keycode: string): string {
    return keyboardSymbols[keycode];
}