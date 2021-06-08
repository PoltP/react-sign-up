
# Getting Started with react-sign-up

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn` or `npm install`

Installs all required packages.

### `yarn dev` or `npm run dev`

Runs both React app and mock server.

### `yarn start` or `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) or [http://127.0.0.1:3000/](http://127.0.0.1:3000/) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn mock-server` or `npm run mock-server`

Runs the mock server.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Form tests cover client validation including cases, when server returns different statuses 200, 400, 429, 500-526.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own. You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


# Project Description

## UX

Signing Up task is quite complex UX task and should be researched by UX-designer in detail. We should implement intuitive interactive validation with showing validation details and test it with different user focus groups.

I've reviewed several approaches to do it from world known products, most interesting of them I described below:
1) [Google](https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1&gmb=exp&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp) - validates email when input focus is lost, if I go back to fix incorrect email I must lost focus again to show am I corrected email or not, that looks not good.
2) [Apple](https://appleid.apple.com/account) - similar to Google, validates email when input focus is lost, if I go back to fix incorrect email I must lost focus again to show am I corrected email or not; inputs "jump" on showing errors.
3) [gitHub](https://github.com/join) - validates on typing each symbol, Chrome autofill overflows information tooltip by its popup and it looks unusable, I should lost input focus to show details. This solution shows detailed validation information, that helps to understand my typing faults.
4) [MicroSoft](https://signup.live.com/signup?wa=wsignin1.0&rpsnv=13&rver=7.3.6963.0&wp=MBI_SSL&wreply=https%3a%2f%2fwww.microsoft.com%2fru-ru%2f&id=74335&aadredir=1&contextid=BC78EB1BD6E62EA6&bk=1623145272&uiflavor=web&lic=1&mkt=RU-RU&lc=1049&uaid=0c37966ce84a420fa67cfebda55d0cbc) -  validates when Next button has been clicked, shows error message above the input, so form changes its size on it.
5) [facebook](https://www.facebook.com/) - validates when input focus is lost and shows errors for each once focused input.
6) [VK](https://vk.com/) - validates when Register button has been clicked.


## Short platform and architecture description

1) create-react-app - to start easily with application environment, can be ejected and set up manually.
(I already have [issue with customization tsconfig](https://github.com/facebook/create-react-app/issues/8909))

2) Typescript - static type definition allows to validate code before it will run, allows to control API contract for developers and provides more readability

3) Styled Components - the most popular implementation of CSS-in-JS. 
I love both SASS and Styled, here I've chosen Styled because of the following:
component based architecture, changes controlled by props, styles can be inherit, do not require to handle class-names manually, styles are rendered only if the component is rendered, easier to write CSS with variables for me etc.
Some references concerning it:\
[Styled Components vs Sass in 2019](https://itnext.io/css-in-js-vs-pre-post-processors-in-2019-8b1e20c066ed) and
[Styled Components vs CSS / SASS / CSS-In-JSX](https://binyamin.medium.com/styled-components-vs-css-sass-css-in-jsx-c3c9268e8945)

4) theming - via ThemeProvider for Styled, I do not use libraries, which implement popular themes like material-ui, carbon, bootstrap etc. to show my point to theming concept

5) i18n - localization prototype, I did'nt any reason to use i18next/react-i18next and similar libraries according to task description, it can be changed quickly using required internationalization library

6) testing - I did't need to install any packages, since create-react-app comes with the [react-testing-library](https://www.npmjs.com/package/@testing-library/react) and its dependencies; to mock server I used my own fetch mock implementation, it can be changed to something like [msw](https://www.npmjs.com/package/msw) if it is required


## Project structure

### Branches
1) [master](https://github.com/PoltP/react-sign-up/tree/master) - implementation with validation on SignUp click;
2) [Validation-on-lost-focus](https://github.com/PoltP/react-sign-up/tree/Validation-on-lost-focus) - implementation with validation when input focus is lost, I personally prefer it.

### Modules

**[.env](https://github.com/PoltP/react-sign-up/blob/master/.env)** - contains environment variables (server host and post etc.)

**[/mock-server](https://github.com/PoltP/react-sign-up/tree/master/mock-server)** - primitive server implementation

**[/src/components](https://github.com/PoltP/react-sign-up/tree/master/src/components)** - components including [Sign Up Form](https://github.com/PoltP/react-sign-up/tree/master/src/components/form), [theming](https://github.com/PoltP/react-sign-up/tree/master/src/components/theming), [localization](https://github.com/PoltP/react-sign-up/tree/master/src/components/localization) and tests for them


## Future

1) Using much more complex patterns to check fields.
2) Using password estimators like [zxcvbn](https://www.npmjs.com/package/zxcvbn).
3) Redesign validation errors.