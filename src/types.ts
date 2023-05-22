import * as github from '@actions/github';

/**
 * Represents a gift made to a non-profit.
 */
export type Gift = {
  amount: number;
  claimed: boolean;
  code: string;
  created_at: string;
  ein?: string;
  message?: string;
  name: string;
  seen: boolean;
  status: 'new' | 'accepted' | 'denied' | 'claimed';
  updated_at: string;
  url: string;
};

export type Octokit = ReturnType<typeof github.getOctokit>;
export type Issue = Awaited<ReturnType<Octokit['rest']['issues']['get']>>['data'];
export type PullRequest = Awaited<ReturnType<Octokit['rest']['pulls']['get']>>['data'];
