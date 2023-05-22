import { getLabelText } from './github';
import type { Issue } from './types';

export const getAmount = (issues: Issue[]): number => {
  const totalAmount = issues.reduce((total, issue) => {
    const amount = issue.labels
      .map((label) => getLabelText(label).match(/Get \$([0-9]+) for Charity/))
      .flatMap((match) => (match ? [match[1]] : []))
      .map((labelAmount) => parseInt(labelAmount, 10))
      .reduce((issueTotal, labelAmount) => issueTotal + labelAmount, 0);
    return total + amount;
  }, 0);
  return totalAmount;
};
