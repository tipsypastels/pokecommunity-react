import queryString from 'query-string';

export function inDevelopment(): boolean {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
}

export function requestingMockData(): boolean {
  return inDevelopment()
    && 'mock' in queryString.parse(window.location.search);
}