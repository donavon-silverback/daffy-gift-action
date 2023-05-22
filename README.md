# Daddy Gift GitHub Action

Reward the people who contribute to your open source projects by gifting a charitable donation to the charity of their choice.

Imagine you have a project that you want to encourage people to contribute to. You can use this GitHub Action to gift a charitable donation to the person who fixes an high-profile Issue.

For example... Say you have am particularity complicated Issue. You could label that issue with `Get $25 for Charity`. When someone fixes the Issue and creates a PR, you can merge the PR and the GitHub Action will automatically gift the PR author $25 to the charity of their choice.

### Add the Daffy Gift GitHub Action to your repository

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

### Set up the Daffy API secret

To set up the Daffy API secret, you will need to create a Daffy account and generate an API key. You can do this by visiting [Daffy](https://daffy.org) and signing up for an account.

Once you have an account, you can generate an API key by visiting the [API Keys](https://www.daffy.org/settings/api) page in your profile.

You will need to copy the API key and add it to your repository's [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets). Be sure to name the secret `DAFFY_API_KEY`.

### Gifting a PR author

Now that you have your action setup, it's time to use it! You will need to create an issue label in your repository named `Get $25 for Charity`. Tha amount can be whatever dollar amount you wish, but you must follow this format. Then assign the label to any issue where you intend to gift the person who works on the issue. When a PR is linked to such an issue, the author of the PR will receive the gift when the PR is merged.

## License

[MIT License](LICENSE)

## TODO

- [ ] Attach the PR author's email address to the gift.
- [ ] Add a comment to the PR letting the author know they received a gift (write permission required on token).
- [ ] Publish the action to the Actions Marketplace
