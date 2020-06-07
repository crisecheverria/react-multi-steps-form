## Live Demo

I submitted the project into the web in order to have a live demo, you can see it with [this link](https://fervent-snyder-da3a03.netlify.app/).

## Project Structure

```js
- <App />
    - <Main /> (class Component)
        - <FormFlightInformation /> (functional components with Hooks, same for the rest listed bellow)
        - <FormFlightCancellation /> (based on interruption type)
        - <FormFlightDelay /> (based on interruption type)
        - <Confirm /> (a presentational component presenting the information enter from the user)
        - <Success /> (a success message at the end)
    - common (is a list of commonly used components)
```

The functionality of the project is a Multi-Step Form, decided to go with that in order to make it look simpler for the end-user and avoid too much information on each step. <br />

I didn't use Routing for this project it wasn't necessary, but it has the feeling of routing.

Also, each component handles it's own state && validation rules. For the validation rules, noting fancy just a bunch of IF's statements. Maybe we can add more power to the validation using something like Joi. <br />

Decided to use **localStorage** instead of React Context or Redux. That would be too much for such a small project, but maybe I could take both into consideration for future enhancement.

### React Hooks

Only the `<Main />` is a Class Component and the reason for that is because we need at least something to render(), based on the structure of the project. The rest are all Functional Components with React Hooks.

## Dependencies

- Create React App. It brings react-testing-library, react, react-dom
- PropTypes. For a proper "typing" implementation in react. COmbined with ESLINT && Airbnb rules is really helpful.

## Development Dependencies

Libraries:

- ESLINT
- Prettier
- Eslint with Airbnb
- Eslint with **a11y for accesibillity.**

## Sugar Date

Sugar is a really nice library for Dates formatting in JS. I decided to give it a try in order to present more human dates for the user, especially non-techincal users who prefer to read a date in this format "June 6th, 2020 09:45 am" instead of something like "2020-06-06T09:45".

## Bulma CSS

For this one decided to go with the good **Bulma CSS** framework. Bulma has a really nice design with great components, it only use CSS with FlexBox as the base for the grid system. <br />

Decided to use a framework in order to have an already built design system so other developers can join and easily start adding more features following Bulma documentation online.<br />

The project is responsive!

## Run locally

Clone the repo and then inside the folder run:

- `yarn` or `npm install`
- `yar start` in order to run the project locally, see bellow for a list of available scripts.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
For this project, I used **react-testing-library**. It's a really great testing framework. You test the behavior of your components in a very smooth and simple way. You can write an automated test in order to verify that your component is working as expected. I have to give 10 points to the community that created this testing framework. <br/>

Maybe I missed a couple of more test cases, but I tried to covert almost most of the important behaviors like testing when inputs are invalid or when the form is invalid and popup a <Notification /> component in order to warn the user that some fields are mandatory. <br/>

I also tested the basic list of elements presents on each component. Some of them just decided to test using matching snapshots, because the rest of the functionality was cover by more specific component & tests.

### `yarn lint` && `yarn lint:fix`

Added **ESLInt with Airbnb rules** in order to have best practices when writing HTML && JS code with React. <br />
Also added **eslint-plugin-jsx-a11y** in order to make sure we follow best practices for our project availability.

The first command `yarn lint` will show you all the errors & warnings that your code has. Then you can try to fix them automatically using `yarn lint:fix`.
