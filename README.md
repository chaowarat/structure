
## Folder Structure

* `folder` must be a lowercase letter (a-zA-Z).
  * `__test__` every components and containers folder must include `__test__` folder that contain all testing file with `.test.js` as an extension Ex. `App.test.js` or `MyComponent.test.js`.
* `filename`
  * `for component` must be start with uppercase of every word then lowercase Ex. `MyComponent.js`, `CustomButton.css` or `MainPage.js`.
  * `general file name` such as for module config or json file will start with lowercase then uppercase of the first character Ex. `setupFile.js`, `coreFunction.js`. or `data.json`.
* `variable` same as `general file name`

```
structure/
  README.md
  node_modules/             /* ignore by .gitignore */
  build/                    /* ignore by .gitignore */
  coverage/                 /* ignore by .gitignore */
  scripts/
  configs/
  package.json
  public/
    index.html
    favicon.ico
  src/                      /* root */
    components/             /* all components */
      Blank/
        __test__/
          Blank.test.js
        Blank.css
        Blank.js
        index.js
    containers/             /* group of components or pages */
      App/
        __test__/
          App.test.js
        App.css
        App.js
        App.test.js
    images/
    redux/
    utils/
    index.css
    index.js
    registerServiceWorker.js
    setupTests.js
```

## Available Scripts

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
When you run `npm test`, Jest will launch in the watch mode. Every time you save a file, it will re-run the tests, just like `npm start` recompiles the code.

The watcher includes an interactive command-line interface with the ability to run all tests, or focus on a search pattern. It is designed this way so that you can keep it open and enjoy fast re-runs. You can learn the commands from the “Watch Usage” note that the watcher prints after every run.

### `npm test -- --coverage`
Launches the test runner with coverage results.

![Jest watch mode](http://facebook.github.io/jest/img/blog/15-watch.gif)

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Code Splitting

Instead of downloading the entire app before users can use it, code splitting allows you to split your code into small chunks which you can then load on demand.

This project setup supports code splitting via [dynamic `import()`](http://2ality.com/2017/01/import-operator.html#loading-code-on-demand). Its [proposal](https://github.com/tc39/proposal-dynamic-import) is in stage 3. The `import()` function-like form takes the module name as an argument and returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which always resolves to the namespace object of the module.

Here is an example:

### `moduleA.js`

```js
const moduleA = 'Hello';

export { moduleA };
```
### `App.js`

```js
import React, { Component } from 'react';

class App extends Component {
  handleClick = () => {
    import('./moduleA')
      .then(({ moduleA }) => {
        // Use moduleA
      })
      .catch(err => {
        // Handle failure
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Load</button>
      </div>
    );
  }
}

export default App;
```

This will make `moduleA.js` and all its unique dependencies as a separate chunk that only loads after the user clicks the 'Load' button.

You can also use it with `async` / `await` syntax if you prefer it.

### Writing Tests

To create tests, add `it()` (or `test()`) blocks with the name of the test and its code. You may optionally wrap them in `describe()` blocks for logical grouping but this is neither required nor recommended.

Jest provides a built-in `expect()` global function for making assertions. A basic test could look like this:

```js
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

All `expect()` matchers supported by Jest are [extensively documented here](https://facebook.github.io/jest/docs/en/expect.html#content).<br>
You can also use [`jest.fn()` and `expect(fn).toBeCalled()`](https://facebook.github.io/jest/docs/en/expect.html#tohavebeencalled) to create “spies” or mock functions.

You can read the [Enzyme documentation](http://airbnb.io/enzyme/) for more testing techniques. Enzyme documentation uses Chai and Sinon for assertions but you don’t have to use them because Jest provides built-in `expect()` and `jest.fn()` for spies.

Here is an example from Enzyme documentation that asserts specific output, rewritten to use Jest matchers:

```js
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome to React</h2>;
  // expect(wrapper.contains(welcome)).to.equal(true);
  expect(wrapper.contains(welcome)).toEqual(true);
});
```

```js
import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

it('renders welcome message', () => {
  const { getByText } = render(<App />);
  expect(getByText('Welcome to React')).toBeInTheDOM();
});
```
