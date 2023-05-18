import * as core from '@actions/core';
import * as github from '@actions/github';
import { Issue, Octokit, PullRequest } from './types';

export const getPullRequest = async (octokit: Octokit): Promise<PullRequest> => {
  if (github.context.eventName !== 'pull_request') {
    throw new Error('This action only runs on pull requests');
  }
  const number = github.context.payload.pull_request?.number;
  if (!number) throw new Error('No pull request number found');

  const response = await octokit.rest.pulls.get({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: number,
  });
  const pr = response.data;
  return pr;
};

export const getPullRequestAuthor = (pr: PullRequest) => {
  if (!pr.user) throw new Error('No user found on pull request');
  const { email, name, login } = pr.user;

  // Arrg! GitHub doesn't return the user's name or email address!!!
  return {
    name: name || login,
    email: email || undefined,
    login,
  };
};

export const getAssociatedIssues = async (octokit: Octokit, pr: PullRequest): Promise<Issue[]> => {
  const matches = pr.body?.matchAll(
    /(?:Fixes|Fix|Fixed|Closes|Close|Closed|Resolves|Resolve|Resolved)\s+#(\d+)/gi
  );
  if (!matches) {
    core.info('No issues found in PR body');
    return [];
  }
  // Get the issue numbers from the regex matches
  const dupedIssueNumbers = [...matches].map((match) => Number(match[1]));
  // Remove duplicates in case user typed "Fixes #123 Fixes #123"
  const issueNumbers = [...new Set(dupedIssueNumbers)];

  // core.debug(`🤖 issues found ${JSON.stringify(issueNumbers, null, 2)}}`);

  // fetch all the issue objects from GitHub
  const issueResponses = await Promise.all(
    issueNumbers.map((issueNumber) =>
      octokit.rest.issues.get({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: Number(issueNumber),
      })
    )
  );
  const issues = issueResponses.map(({ data }): Issue => data);
  return issues;
};

export const getLabelText = (label: Issue['labels'][0]): string => {
  return typeof label === 'string' ? label : label.name || '';
};

export const addComment = async (
  octokit: Octokit,
  pr: PullRequest,
  message: string
): Promise<void> => {
  await octokit.rest.issues.createComment({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: pr.number,
    body: message,
  });

  core.info(`💬 Comment added to PR #${pr.number}`);
};
