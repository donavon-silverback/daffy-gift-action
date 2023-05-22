import * as core from '@actions/core';
import * as github from '@actions/github';
import { DaffyClient } from './daffy';
import { addComment, getAssociatedIssues, getPullRequest, getPullRequestAuthor } from './github';
import { getAmount } from './getAmount';

async function run(): Promise<void> {
  try {
    const token = core.getInput('github_token');
    core.info(`token: ${JSON.stringify(token, null, 2)}`);
    if (!token) throw new Error('GitHub token not found');

    const apiKey = core.getInput('daffy_api_key');
    if (!apiKey) throw new Error('Daffy API key not found');

    core.info('🤖 Daffy Gift Action is running...');

    const octokit = github.getOctokit(token);

    // Make sure this action is being run on a pull request
    const pr = await getPullRequest(octokit);
    if (!pr) return;

    // core.debug(`🤖 PR found ${JSON.stringify(pr, null, 2)}}`);

    // Get an array of associated issues (e.g. "Fixes #123", or "Resoled #456", etc.)
    const issues = await getAssociatedIssues(octokit, pr);
    if (issues.length === 0) {
      core.info('🤖 Skipping... No issues found in PR body');
      return;
    }

    // core.debug(`🤖 issues found ${JSON.stringify(issues, null, 2)}}`);

    // Search through all issues looking for labels that match "Get $xx for Charity"
    // and sum up the total amount
    const amount = getAmount(issues);
    if (amount === 0) {
      core.info('🤖 Skipping... Amount is $0');
      return;
    }

    // Get the PR author's GitHub email address and name
    const { email, name, login } = getPullRequestAuthor(pr);

    if (!pr.merged) {
      core.info(
        `💰 Once this PR is merged, a gift of $${amount} will be sent to ${name}<${email}>`
      );
      return;
    }

    // Issue a POST to the Daffy API to send a gift
    const message = `Thank you for your contribution to open source! You have earned a gift of $${amount} to donate to the charity of your choice.`;
    const client = new DaffyClient(apiKey);
    await client.sendGift({ name, amount, email, message });

    // Add a comment to the PR with a "thank you" message
    addComment(octokit, pr, `@${login},\n\n${message}\n\n— Powered by [Daffy](https://daffy.org))`);
    core.info(`💬 Comment added to PR #${pr.number}`);

    core.info(`💰 A gift of $${amount} has been sent to ${name}<${email}>`);
  } catch (exception) {
    const message = exception instanceof Error ? exception.message : 'unknown error';
    core.setFailed(message);
  }
}

run();
