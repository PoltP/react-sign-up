

# Short platform and architecture description

1) create-react-app - to start easily with application environment, can be ejected and set up manually.
I already have some issues with customization tsconfig (https://github.com/facebook/create-react-app/issues/8909) :)

2) Typescript - static type definition allows to validate code before it will run, allows to control API contact for developers and provides more readability.

3) Styled Components - the most popular implementation of CSS-in-JS. 
I love both SASS and Styled, here I've chosen Styled because of the following:
component based architecture, changes controlled by props, styles can be inherit, do not require to handle class-names manually, styles are rendered only if the component is rendered, easier to write CSS with variables for me etc.
Some references concerning it:
https://itnext.io/css-in-js-vs-pre-post-processors-in-2019-8b1e20c066ed
https://binyamin.medium.com/styled-components-vs-css-sass-css-in-jsx-c3c9268e8945

4) theming - via ThemeProvider for Styled

5) i18n - localization prototype, I do not see any reason to use i18next/react-i18next and similar libraries now according to task description, it can be changed quickly using required internationalization library&


# -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
