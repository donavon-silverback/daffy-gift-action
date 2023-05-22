<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Create a JavaScript Action using TypeScript

Use this template to bootstrap the creation of a TypeScript action.:rocket:

This template includes compilation support, tests, a validation workflow, publishing, and versioning guidance.

If you are new, there's also a simpler introduction. See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Create an action from this template

Click the `Use this Template` and provide the new repo details for your action

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies

```bash
$ npm install
```

Build the typescript and package it for distribution

```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Change action.yml

The action.yml defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try {
      ...
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action

## Add the Daffy Gift GitHub Action to your repository

To add the Daffy Gift GitHub Action to your repository that runs each time a PR is merged, create a new workflow file in your repository's `.github/workflows` directory. The workflow file should be named `daffy-gift.yml`.

Add the following code to the `daffy-gift.yml` file:

```yaml
name: Daffy Gift

on:
  pull_request:
    types: [closed]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: donavon-silverback/daffy-gift-action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          daffy_api_key: ${{ secrets.DAFFY_API_KEY }}
```

## Set up the Daffy API secret

To set up the Daffy API secret, you will need to create a Daffy account and generate an API key. You can do this by visiting [Daffy](https://daffy.org) and signing up for an account.

Once you have an account, you can generate an API key by visiting the [API Keys](https://www.daffy.org/settings/api) page in your profile.

You will need to copy the API key and add it to your repository's [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets). Be sure to name the secret `DAFFY_API_KEY`.

## Gifting a PR author

Now that you have your action setup, it's time to use it! You will need to create an issue label in your repository named `Get $25 for Charity` (or whatever dollar amount you wish). Then assign the label to any issue where you intend to gift the person who works on the issue. When a PR is linked to such an issue, the author of the PR will receive the gift when the PR is merged.

## License

[MIT License](LICENSE)

x
