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

>christian.hochlin [12:43 PM]
>for å publishe til chrome webstore er det nok å legge en credentials.json-fil i root og kjøre gulp-tasken store-publish
>den må inneholde dette:

>christian.hochlin [12:43 PM]
>added this JavaScript/JSON snippet: Untitled 

```
  {
    "clientId": "insert client id",  
    "clientSecret": "insert client secret",
    "refreshToken": "insert refresh token"
  }
