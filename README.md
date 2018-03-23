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
