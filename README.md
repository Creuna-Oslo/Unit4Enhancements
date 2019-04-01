# Unit 4 UX Enhancements

This is a chrome plugin to enhance the UX when logging hours in Unit4

## How to install

**As a developer**

- Download the files or clone.
- Run `npm install`
- Run `gulp` (This will build the extension and start atomatic building on file changes)
- Go to chrome://extensions and drag and drop the **dist** folder.

**As a user**

Get the extension from the [Chrome Webstore](https://chrome.google.com/webstore/detail/unit4-ux-enhancements/phmpdjdaaenhgojfhacckdjpomnopkoh) to install.

Note: This extension will only work on Creuna's Unit4 installation

## How to deploy

To publish to Chrome webstore, add a credentials.json-file to the root, and run the gulp-task store-publish.
The file should look like this:

```
  {
    "clientId": "insert client id",
    "clientSecret": "insert client secret",
    "refreshToken": "insert refresh token"
  }
```

**Remember to bump `version` in `src/manifest.json` before attempting to publish**

### How to get client Id, secret and token

1.  Become a google developer: [Go here](https://chrome.google.com/webstore/developer/dashboard). You might have to pay \$5 for this.
1.  Follow [this guide](https://developer.chrome.com/webstore/using_webstore_api).

### Debugging

1. If you see an `invalid_grant` error when trying to publish, see [this](https://blog.timekit.io/google-oauth-invalid-grant-nightmare-and-how-to-fix-it-9f4efaf1da35). If you haven't made a publish in the last 6 months, you might need to get a new `refreshToken`.

## Transferring the extension to another person

1.  Apply for transfer [here](https://support.google.com/chrome_webstore/contact/dev_account_transfer)
1.  The new owner has to generate the appropriate credentials (see above).
