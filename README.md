# Umi Feeds app :stuffed_flatbread:

React Native app :iphone: for [Umi Feeds](https://umifeeds.org/), an Atlanta-based food rescue organization. The Umi Feeds app allows for local businesses to fill out a form to post a food donation. Volunteers (as well as admins) :raising_hand: can view any active donations through a map or list view, and mark a donation as picked up and delivered :red_car: to Umi Feeds for later redistribution to the food-insecure. Admins are notified whenever a food donation is made. 

Video demo from Fall 2022 Bits of Good Demo Day [here](https://screenrec.com/share/9NqM3JGpXE).  

Backend server repo at <https://github.com/GTBitsOfGood/umi-feeds-backend>.

## Getting Started 	:computer:
**[IMPORTANT FOR DEVELOPERS]Environment**
> **Nodev16.6.2 | Expo SDK 44 | expo-cli 4.10.0** 

- Clone this repository to your computer.
- Follow the instructions [here](https://www.notion.so/gtbitsofgood/Getting-Started-56106473076a47eaa8c863741becbf34) to install Git, Node.js (v12.X LTS at least) and the Bitwarden-CLI.
- Install dependencies: `npm install`
- On Linux, run `npm run secrets` to download development secrets from Bitwarden and save them to the `.env` file locally. Contact a leadership member for the Bitwarden password. You can also just login to bitwarden and copy the secrets from the .env file from the web. 
  - **Note**: If you are using the Windows command prompt or a Mac, enter `npm run secrets:login` (logging in only needs to be done once) and then `npm run secrets:sync`. You may have to enter the Bitwarden password multiple times. You should re-run this whenever the secrets in Bitwarden changes.
- Start project: `npm start`

## Dockerized Builds

1. Install docker and docker-compose

MacOS: [Docker Desktop for MacOS](https://docs.docker.com/desktop/install/mac-install/)

Windows: [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

Linux: [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

2. Obtain your secrets -- **Linux or MacOS** (Skip if Windows); you will need to obtain a password from your Engineering Manager:

First, install **BitWarden CLI** and **fx** with `npm install -g @bitwarden/cli fx`

Or, if you're using Homebrew, run `brew install bitwarden-cli fx`

Now fetch the secrets from BitWarden with `yarn secrets:linux`

2. Obtain your secrets -- **Windows Machines** (Skip if MacOS or Linux); you will need to obtain a password from your Engineering Manager:

First, install **BitWarden CLI** and **fx** with npm with `npm install -g @bitwarden/cli fx`

Now fetch the secrets from BitWarden with `npm run secrets:login` and `npm run secrets:sync`

3. Login to Expo in your local environment

```
expo login
```

4. This respository can be run inside of a Docker container. To run the development environment with Expo, run `docker-compose up --build`

3. To run custom node commands, start with the NODE_COMMAND environment variable before your docker-compose command. Ex: `NODE_COMMAND=test docker-compose up --build`

### Expo Go 

Install Expo Go on your Android or iPhone/iPad. Expo Go allows you to preview your app on your Android or iPhone/iPad. Please make sure you're on the same wifi network as your development computer that launched `npm start` or `docker-compose up --build`
- Google Play: https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US
- Apple App Store: https://apps.apple.com/us/app/expo-go/id982107779

Log into Expo Go using the credentials found in [Bitwarden](https://bitwarden.com/). Log into Expo CLI on your computer
> `expo login`

Now, after you start your development server with `npm start` or `docker-compose up --build`, your Expo Go app should show something like "umi-feeds-app on DESKTOP-sdfjij" under the section Recently in Development. So you can test out the app now!

Expo Go has Fast Refresh, so when you save changes to your code and your development server is running, the app in Expo Go will automatically reflect those changes. To reload the app entirely, shake your device and a menu will pop up that lets you Reload or Go to Home.

Expo also provides a beta web version; after you run `npm start` and your browser opens Expo Developer Tools in `localhost:19002`, you could click "Run in web browser" to see the app in your browser. Some Expo features don't work in the browser, however. 

## Development Environment 
There will be 2 different development environments that developers will be working in depending on the tickets that they're assigned. Please note that a common Mongo Atlas Database and Azure Image Storage account will be shared by all the devs. You're free to create your own free Mongo Atlas account for your own testing purposes.

#### Dev Environment #1 

<div align="center">
<img src="https://user-images.githubusercontent.com/55326650/131023615-c6c2a59b-2d28-4499-b65d-ce4d0d35dc35.JPG" align="center" width="80% alt="Project icon">
</div>

This is desired environment for developers working on just native app features like styling, forms, screens, etc. The environment is setup so that they just need to run have their react-native app running through expo on their local machines with their phones or any emulator for testing. The most up to date and stable version of the backend server will be deployed at the heroku endpoint so that developers do not need to worry about having a backend instance running on their machines as well.

#### Dev Environment #2 

<div align="center">
<img src="https://user-images.githubusercontent.com/55326650/131024364-573b69a9-fa16-490b-ad57-4093c9eda169.JPG" align="center" width="80% alt="Project icon">
</div>

This is the desired environment for developers working on the backend REST-API server or making changes to the database schema. Therefore the backend server will be running on their local machines. If the developer is working on integration features between the front and backend, they'll likely need to have both instances running at once. 

## Code Structure 
    
* `App.tsx`       The main starting point of the app that renders the navigation component
* `\navigations`  Defines the navigation structure of the app and renders a corresponding screen for each navigation 
* `\screens`      The different screen for the mobile app that render components 
* `\components`   Defines the different React Components that are used on the different screens 
* `\redux`        Defines the redux store, reducers, and thunks used by the components 

Currently components in both the `\screens` and `\components` directory are connected to the redux state. Ideally we would want to start shifting our codebase so that the react components in the `\components` are stateless and all the "smart components" connected to the redux state are the screens in the `\screens`

## Code Template
We'll be more strict with our documentation going forward so all developers MUST follow the documentation template when coding. It will save future developers ALOT of time. Your PR will not be accepted if the documentation template is not followed

## Code/PR Workflow :nerd_face:

- Assign an issue to yourself under the projects tab [here](https://github.com/GTBitsOfGood/umi-feeds-app/projects) for the current sprint and move it to the "In Progress" pipeline.
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
- Run `NODE_COMMAND=build:android docker-compose up --build` or `expo build:android`
- Select the "APK" option when asked

### iOS
- Run `NODE_COMMAND=build:ios docker-compose up --build` or `expo build:ios`
- If asked for bundle identifer, type `org.bitsofgood.umifeeds`
- Select the `simulator` option to be able to run this in Expo Go. (The other option requires an Apple Developer ID.)

### Web
Expo Web is in beta so not all the features of the app will necessarily work correctly in the web version. We use it just to provide a convenient preview of the app.
- Optional: `npx expo-optimize` to optimize the assets for speed
- `NODE_COMMAND=build:web docker-compose up --build` or `expo build:web`. This makes a web-build/ directory.
- See more details at https://docs.expo.io/distribution/publishing-websites/.
- We've set up Netlify with continuous deployment from our Git repository, with the build command `npm install -g expo-cli -y && expo build:web` and the publish directory `web-build`. https://umifeeds.netlify.app is automatically built from the `develop` branch.

## Google Maps API Key Setup 

This application uses the Google Maps API for the standalone Android app. Here are the steps to set up your own:
- Change `org.bitsofgood.umifeeds` to `com.youcompany.yourappname` in `android.package` in `app.json`
- Run `expo build:android` 
- Follow the instructions at ["MapView - Expo Documentation"](https://docs.expo.io/versions/v40.0.0/sdk/map-view/#deploying-to-a-standalone-app-on-android) for deploying to a standalone app on Android under "If you have not configured Google Sign In"

## Inspiration and Resources

#### Crash Minute Videos 
* [React Navigation](https://bluejeans.com/s/xkNwzcIvLwK)
* [Mongo Atlas](https://bluejeans.com/s/MCs25nNpxBx)

#### Redux
* [Redux Toolkit](https://redux-toolkit.js.org/)

#### Code Structure 
* [Code Structure Inspiration](https://cheesecakelabs.com/blog/efficient-way-structure-react-native-projects/)

#### React Navigation
* [React Navigation](https://reactnavigation.org/docs/)
* [React Navigation with Type Checking Guide](https://reactnavigation.org/docs/typescript/)

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
