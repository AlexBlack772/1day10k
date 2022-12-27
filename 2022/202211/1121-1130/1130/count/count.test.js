import count from './count.js';
import { expect } from 'chai';

test('count', () => {
   expect(count(1)).toBe(2);
}
