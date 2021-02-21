# Umi Feeds app

React Native app for [Umi Feeds](https://umifeeds.org/), an Atlanta-based food rescue organization. Backend server repo at <https://github.com/GTBitsOfGood/umi-feeds-backend>.

## Setup

- Clone this repository to your computer.
- Follow the instructions [here](https://www.notion.so/gtbitsofgood/Getting-Started-56106473076a47eaa8c863741becbf34) to install Git, Node.js (v12.X LTS at least) and the MongoDB Community Server.
- Install dependencies: `npm install`
- On Linux, run `npm run secrets` to download development secrets from Bitwarden and save them to the `.env` file locally. Contact a leadership member for the Bitwarden password.
  - **Note**: If you are using the Windows command prompt or a Mac, enter `npm run secrets:login` (logging in only needs to be done once) and then `npm run secrets:sync`. You may have to enter the Bitwarden password multiple times. You should re-run this whenever the secrets in Bitwarden changes.
- Start project: `npm start`

## Code/PR Workflow

- Assign an issue to yourself and move it to the "In Progress" pipeline. You will have to use ZenHub, either through the [Chrome or Firefox extension](https://www.zenhub.com/extension) or through their [web-app](https://app.zenhub.com/), to do this. **Pro-tip**: ZenHub will let you filter issues by labels and milestones.
- Create a new branch in the format `[NAME]/[ISSUE-NUMBER]-[SHORT-DESCRIPTION]` (issue number is optional) by running `git checkout -b [BRANCH NAME]`.
  - example branch name: `daniel/48-setup-ci`
- Be sure to lint, format, and type-check your code occasionally to catch errors by running `npm run lint`. eslint can try to automatically fix some of the linting errors with `npm run lint:fix`. Reach out to an EM if you are having problems with the type-checker or are blocked by anything else in general.
  - If you're using Visual Studio Code, install the ESLint extensions so you can see ESLint errors right in your editor.
  - Before a push can succeed, it must pass linting.
- Commit changes and then push your branch by running `git push -u origin [BRANCH NAME]`.
- Create a pull request (PR) on GitHub to merge your branch into `develop`.
- In your PR, briefly describe the changes, link the PR to its corresponding issue, and request a Senior Developer or EM as a reviewer.

## TypeScript

The codebase has been primarily written in TypeScript, which is a superset of JavaScript that adds static typing to the language. This means that if you already know how to write JavaScript, you already know how to write TypeScript! Simply rename your `.js` and `.jsx` files to `.ts` and `.tsx`, respectively.

TypeScript will help you catch bugs early at compile-time and save you significant time from manually debugging your code. If your code compiles, you can be very certain that it will work as expected.

To fully utilize the power of TypeScript, you will have to [learn its type system](https://learnxinyminutes.com/docs/typescript/). Use [this](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/README.md#section-2-getting-started) as a cheat sheet for using TypeScript with React.

While you are encouraged to use TypeScript, you **don't** have to. Our codebase can be a mix of both TypeScript and JavaScript.

## Expo Build
- run `expo build:andriod` or `expo build:ios`
### Andriod
  - This will require an Expo sign in. Contact leadership if you need the Bitwarden password for Expo account.
  - select APK
### IOS
  - if asked for bundle identifer, type `org.bitsofgood.umifeeds`
  - select the `simulator` option


## Google Maps API Key Setup 

This application uses the Google Maps API for the standalone andriod app. Here are the steps to set up your own:
- change `org.bitsofgood.umifeeds` to `com.youcompany.yourappname` in `android.package` in `app.json`
- run `expo build:andriod` 
- Follow [the these instructions](https://docs.expo.io/versions/v40.0.0/sdk/map-view/#deploying-to-a-standalone-app-on-android) for deploying to a standalone app on Andriod under "If you have not configured Google Sign In"


