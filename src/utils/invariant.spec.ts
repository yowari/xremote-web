import { invariant } from './invariant';

describe('invariant', () => {
  it('should throw an error if condition is false', () => {
    expect(() => {
      invariant(false, 'message');
    }).toThrow('message');
  });
});
