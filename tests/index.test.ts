import { expect, test } from 'vitest';
import { hello } from '../src/hello';

test('fn', () => {
  expect(hello()).toBe('Hello, tsdown!');
});
