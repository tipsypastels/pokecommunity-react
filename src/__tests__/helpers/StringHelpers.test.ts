import { toWords, camelCase, underScore, kebabCase } from '../../scripts/helpers/StringHelpers';

/**
 * It shouldn't be necessary to test every permuatation of every combination, because most of them just call toWords internally and replace spaces. Test toWords itself and camelCase because that one is slightly more complex. Others can be tested only with a single input.
 */

test('toWords on a sentence', () => {
  expect(toWords('hello world')).toBe('hello world')
});

test('toWords on a camelCase string', () => {
  expect(toWords('helloWorld')).toBe('hello world');
});

test('toWords on a kebab-case string', () => {
  expect(toWords('hello-world')).toBe('hello world');
});

test('toWords on a snake_case string', () => {
  expect(toWords('hello_world')).toBe('hello world');
});

test('camelCase on a sentence', () => {
  expect(camelCase('hello world')).toBe('helloWorld');
});

test('camelCase on a camelCase string', () => {
  expect(camelCase('helloWorld')).toBe('helloWorld');
});

test('camelCase on a kebab-case string', () => {
  expect(camelCase('hello-world')).toBe('helloWorld');
});

test('underScore on a sentence', () => {
  expect(underScore('hello world')).toBe('hello_world');
});

test('kebabCase on a sentence', () => {
  expect(kebabCase('hello world')).toBe('hello-world');
});