# Daddy Gift GitHub Action

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
