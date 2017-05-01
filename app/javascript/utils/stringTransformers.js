export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export function pascalize(word) {
  return word.split(' ').map((word) => {
    return capitalize(word);
  }).join('_').split('_').map((word) => {
    return capitalize(word);
  }).join('');
};

export function pluralize(string, number) {
  const hasNumber = number !== undefined && number !== null;
  if (!hasNumber) {
    number = 2;
  }
  let word;
  if (number === 1) {
    word = string;
  } else {
    const length = string.length;
    switch (string[length - 1]) {
      case 'y':
        word = `${string.slice(0, length - 1)}ies`;
        break;
      case 's':
        word = `${string}es`;
        break;
      default:
        word = `${string}s`;
        break;
    }
  }

  if (hasNumber) {
    return `${number} ${word}`;
  } else {
    return word;
  }
};

export function singularize(string) {
  const length = string.length;
  if (string.slice(length - 3, length) === 'ies') {
    return `${string.slice(0, length - 3)}y`;
  } else if (string.slice(length - 2, length) === 'es') {
    return string.slice(0, length - 2);
  } else {
    return string.slice(0, length - 1);
  }
};

export function titleize(word) {
  return word.split(' ').map((word) => {
    return capitalize(word);
  }).join('_').split('_').map((word) => {
    return capitalize(word);
  }).join(' ');
};
