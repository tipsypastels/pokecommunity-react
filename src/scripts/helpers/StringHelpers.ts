export function capitalize(input: string): string {
  return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

export function camelCase(input: string): string {
  return toWords(input).replace(/\s./g, match => {
    return match[match.length - 1].toUpperCase();
  });
}

export function upperCamelCase(input: string): string {
  return input[0].toUpperCase() + camelCase(input.slice(1));
}

export function underScore(input: string): string {
  return toWords(input).replace(/\s/g, '_').toLowerCase();
}

export function kebabCase(input: string): string {
  return toWords(input).replace(/\s/g, '-').toLowerCase();
}

export function toWords(input: string): string {
  return input.replace(/[\s-_A-Z]/g, match => {
    if (/^[A-Z]$/.exec(match)) {
      return ` ${match.toLowerCase()}`;
    } else {
      return ' ';
    }
  });
}