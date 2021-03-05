# Umi Feeds app

React Native app for [Umi Feeds](https://umifeeds.org/), an Atlanta-based food rescue organization. Backend server repo at <https://github.com/GTBitsOfGood/umi-feeds-backend>.

## Setup

- Clone this repository to your computer.
- Follow the instructions [here](https://www.notion.so/gtbitsofgood/Getting-Started-56106473076a47eaa8c863741becbf34) to install Git, Node.js (v12.X LTS at least) and the MongoDB Community Server.
- Install dependencies: `npm install`
- On Linux, run `npm run secrets` to download development secrets from Bitwarden and save them to the `.env` file locally. Contact a leadership member for the Bitwarden password.
  - **Note**: If you are using the Windows command prompt or a Mac, enter `npm run secrets:login` (logging in only needs to be done once) and then `npm run secrets:sync`. You may have to enter the Bitwarden password multiple times. You should re-run this whenever the secrets in Bitwarden changes.
- Start project: `npm start`

### Expo Go

Install Expo Go on your Android or iPhone/iPad. Expo Go allows you to preview your app on your Android or iPhone/iPad.
- Google Play: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US
- Apple App Store: https://apps.apple.com/us/app/expo-go/id982107779

Log into Expo Go using the credentials found in [Bitwarden](https://bitwarden.com/). Log into Expo CLI on your computer using `expo login`.

Now, after you start your development server with `npm start`, your Expo Go app should show something like "umi-feeds-app on DESKTOP-sdfjij" under the section Recently in Development. So you can test out the app now!

Expo Go has Fast Refresh, so when you save changes to your code and your development server is running, the app in Expo Go will automatically reflect those changes. To reload the app entirely, shake your device and a menu will pop up that lets you Reload or Go to Home.

Expo also provides a beta web version; after you run `npm start` and your browser opens Expo Developer Tools in `localhost:19002`, you could click "Run in web browser" to see the app in your browser. Some Expo features don't work in the browser, however. 

## Code/PR Workflow

- Assign an issue to yourself and move it to the "In Progress" pipeline. You will have to use ZenHub, either through the [Chrome or Firefox extension](https://www.zenhub.com/extension) or through their [web-app](https://app.zenhub.com/), to do this. **Pro-tip**: ZenHub will let you filter issues by labels and milestones.
- Create a new branch in the format `[NAME]/[ISSUE-NUMBER]-[SHORT-DESCRIPTION]` (issue number is optional) by running `git checkout -b [BRANCH NAME]`.
  - example branch name: `daniel/48-setup-ci`
- Be sure to lint, format, and type-check your code occasionally to catch errors by running `npm run lint`. eslint can try to automatically fix some of the linting errors with `npm run lint:fix`. Reach out to an EM if you are having problems with the type-checker or are blocked by anything else in general.
  - If you're using Visual Studio Code, install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) so you can see ESLint errors right in your editor.
  - Before a push can succeed, it must pass linting. (This is because we have a Husky pre-push hook in `package.json` which runs `npm run lint`.)
- Commit changes and then push your branch by running `git push -u origin [BRANCH NAME]`.
- Create a pull request (PR) on GitHub to merge your branch into `develop`.
- In your PR, briefly describe the changes, link the PR to its corresponding issue, and request a Senior Developer or EM as a reviewer.

## TypeScript

The codebase has been primarily written in TypeScript, which is a superset of JavaScript that adds static typing to the language. This means that if you already know how to write JavaScript, you already know how to write TypeScript! Simply rename your `.js` and `.jsx` files to `.ts` and `.tsx`, respectively.

TypeScript will help you catch bugs early at compile-time and save you significant time from manually debugging your code. If your code compiles, you can be very certain that it will work as expected.

To fully utilize the power of TypeScript, you will have to [learn its type system](https://learnxinyminutes.com/docs/typescript/). Use [this](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#section-2-getting-started) as a cheat sheet for using TypeScript with React.

While you are encouraged to use TypeScript, you **don't** have to. Our codebase can be a mix of both TypeScript and JavaScript.

## Expo Build
This will require an Expo sign in. Contact leadership if you need the Bitwarden password for Expo account.

### Android
- Run `expo build:android`
- Select the "APK" option when asked

### iOS
- Run `expo build:ios`
- If asked for bundle identifer, type `org.bitsofgood.umifeeds`
- Select the `simulator` option to be able to run this in Expo Go. (The other option requires an Apple Developer ID.)

### Web
Expo Web is in beta so not all the features of the app will necessarily work correctly in the web version. We use it just to provide a convenient preview of the app.
- Optional: `npx expo-optimize` to optimize the assets for speed
- `expo build:web`. This makes a web-build/ directory.
- See more details at https://docs.expo.io/distribution/publishing-websites/.
- We've set up Netlify with continuous deployment from our Git repository, with the build command `npm install -g expo-cli -y && expo build:web` and the publish directory `web-build`. https://umifeeds.netlify.app is automatically built from the `develop` branch.

## Google Maps API Key Setup 

This application uses the Google Maps API for the standalone Android app. Here are the steps to set up your own:
- Change `org.bitsofgood.umifeeds` to `com.youcompany.yourappname` in `android.package` in `app.json`
- Run `expo build:android` 
- Follow the instructions at ["MapView - Expo Documentation"](https://docs.expo.io/versions/v40.0.0/sdk/map-view/#deploying-to-a-standalone-app-on-android) for deploying to a standalone app on Android under "If you have not configured Google Sign In"

## License

This repository is by Bits of Good contributors and is licensed under the GPL v3.

Some files (useNotification.ts and registerForPushNotification.ts) are derived from code from the Expo documentation, which is licensed under the MIT license.

The MIT License (MIT)

Copyright (c) 2015-present 650 Industries, Inc. (aka Expo)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
