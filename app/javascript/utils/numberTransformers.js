export function randomInteger() {
  Math.round(Math.random() * 10000) + 1;
}

export function randomFloat() {
  Math.round(randomInteger() * 100) / 100;
}

export function roundNumber(number, precision = 2) {
  const factor = 10**precision;
  return Math.round(number * factor) / factor;
}
