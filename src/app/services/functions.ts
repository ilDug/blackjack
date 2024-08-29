const keyValues = {
    'Digit2': '2',
    'Digit3': '3',
    'Digit4': '4',
    'Digit5': '5',
    'Digit6': '6',
    'Digit7': '7',
    'Digit8': '8',
    'Digit9': '9',
    'Digit0': '10',
    'KeyJ': 'J',
    'KeyQ': 'Q',
    'KeyK': 'K',
    'KeyA': 'A',
    'KeyU': '♥',
    'KeyI': '♦',
    'KeyO': '♣',
    'KeyP': '♠'
}

export function draw(keycode: string): string {
    return keyValues[keycode];
}