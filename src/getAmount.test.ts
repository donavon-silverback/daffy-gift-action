import { getAmount } from './getAmount';

describe('getAmount', () => {
  it('should return 0 if no issues are passed', () => {
    const amount = getAmount([]);
    expect(amount).toBe(0);
  });
  it('should return 0 if no issues have a "Get $xx for Charity" label', () => {
    const issues = [{ labels: [{ name: 'foo' }] }] as any;
    const amount = getAmount(issues);
    expect(amount).toBe(0);
  });

  it('should return the sum of all "Get $xx for Charity" labels', () => {
    const issues = [
      {
        labels: [
          { name: 'foo' },
          { name: 'Get $5 for Charity' },
          { name: 'bar' },
          { name: 'Get $10 for Charity' },
        ],
      },
    ] as any;
    const amount = getAmount(issues);
    expect(amount).toBe(15);
  });
});
