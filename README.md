# React Testing Library Jest:

Open App.test.js:

Run in terminal:

```
npm start
```

In App.test.js:

```
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

```

In App.js:

```
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

```

## A Test consists of 3 parts:

### Step 1: Rendering the component:

```
  render(<App />);
```

### Select a specific html element:

There are various methods to select the html element. You can provide a "data-testid" attribute to the html element or getByText etc.

```
 const linkElement = screen.getByText(/learn react/i);
```

We use / /i to set it as case-insensitive

Here it basically selects the link in App.js which has the text "Learn React":

```
<a
   className="App-link"
   href="https://reactjs.org"
   target="_blank"
   rel="noopener noreferrer"
>
  Learn React
</a>
```

### Step 3: Expectation - Check if item exists in the document or not.

```
expect(linkElement).toBeInTheDocument();
```

To run the test:

```
npm test
a
```

It passes the test. Now if you change the Text in the link it fails.

```
  TestingLibraryElementError: Unable to find an element with the text: /learn react/i. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.
```

Let's do a few more exmaples:

#### Example 1:

In App.js create a list of 3 items:

```
      <header className="App-header">
       .....
        <ul>
          <li>United Kingdom</li>
          <li>United Sates Of America</li>
          <li>Asia</li>
        </ul>
      </header>
```

Create a new test in App.test.js to check if the list has 3 items:

Refer to https://testing-library.com/docs/queries/about for the full list of queries

https://testing-library.com/docs/queries/byrole

Here we can use .getByRole but since we have more than 1 item, we need to use .getAllByRole

Refer to the table of HTML elements with their default and desired roles here. https://www.w3.org/TR/html-aria/#docconformance

Find the li element in the table to find the correct role name.

```
li     role=listitem
```

```
test("renders 3 list items", () => {
  render(<App />);
  const listElement = screen.getAllByRole("listitem");
  expect(listElement).toHaveLength(3);
});
```

You can refer to the expect methods list to choose the right method for your test case:
https://jestjs.io/docs/expect

#### Example 2:

In App.js create a title and sum element:

```
import logo from "./logo.svg";
import "./App.css";

function App() {
  const a = 2;
  const b = 4;
  return (
    ..
    <header className="App-header">
       .....
       <h1 data-testid="mytestid">Hello</h1>
        <span title="sum">{a+b}</span>
      </header>
```

Create 2 new tests in App.test.js to check the title and sum:

Refer to https://testing-library.com/docs/queries/about for the full list of queries

Test title:

https://testing-library.com/docs/queries/bytestid

Here we can use .getByTestId

```
test("renders title", () => {
  render(<App />);
  const titleElement = screen.getByTestId("mytestid");
  expect(titleElement).toBeInTheDocument();
});
```

You can refer to the expect methods list to choose the right method for your test case:
https://jestjs.io/docs/expect

Test sum:

https://testing-library.com/docs/queries/bytitle

Here we can use .getByTitle

```
test("sum should be 6", () => {
  render(<App />);
  const sumElement = screen.getByTitle("sum");
  expect(sumElement.textContent).toBe("6");
});

```

You can refer to the expect methods list to choose the right method for your test case:
https://jestjs.io/docs/expect

## Wallaby.js Extension:

Provides you with an accelaretd distraction-free JS testing.

cmd+shift+p on Mac
ctrl+shift+p on Windows

Select Wallaby.js:Start and you can see errors in realtime next to the test. Click on View Story to see the detailed view of an error.

Install Tailwindcss:

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

In tailwind.config.js:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

## JEST and Testing Library:

To test your application you need to reach the DOM elements and Testing Library (https://testing-library.com/docs) helps us reach the DOM elements by using different queries (https://testing-library.com/docs/queries) and user actions (https://testing-library.com/docs/dom-testing-library/api-events).

JEST is a JS Testing Library which lets you run tests.

## Test-Driven Development:

We write our tests first and then create every element or function in our application. TDD let's you focus on the user interaction first.

Create a Login component in components/Login.jsx:

```
import React, { useState } from "react";

function Login() {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const handleClick = async (e)=>{
    e.preventDefault();
    try{

    }catch(err){

    }

}
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center">
      <form className="flex flex-col items-center">
        <span className="text-black font-bold">username</span>
        <input
          className="p-2 my-2 h-8 border rounded-md"
          type="text"
          placeholder="username"
          //   value="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 my-2 h-8 border rounded-md"
          type="password"
          placeholder="password"
          //   value="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          //   disabled="true"
          disabled={!username || !password}
          className="w-36 h-7 bg-teal-600 text-white border-none font-bold m-2  cursor-pointer rounded-md disabled:bg-teal-300 disabled:cursor-not-allowed"
          onClick={handleClick}
        >
          Login
        </button>
      </form>
      <span
        data-testid="error"
        style={{ visibility: error ? "visible" : "hidden" }}
        className="text-red-400 mt-5"
      >
        Something went wrong!
      </span>
    </div>
  );
}

export default Login;


```

Create in components/Login.test.js

Refer to https://testing-library.com/docs/queries/about for the full list of queries

You can refer to the expect methods list to choose the right method for your test case:
https://jestjs.io/docs/expect

```
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

test("username input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled by default", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  expect(userInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});


test("button should not be disabled when username and password entered", () => {
    render(<Login />);
    const buttonEl = screen.getByRole("button");
    const userInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    const testValue = "test";
    fireEvent.change(userInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(buttonEl).not.toBeDisabled();
  });

```

Install axios:

```
npm instal axios
```

Create the handleClick function in Login.js:
We make use of axios and a fake REST Api link: https://jsonplaceholder.typicode.com/users/1

```
import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUser(data);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center">
      <form className="flex flex-col items-center">
        <span className="text-black font-bold">{user.name}</span>
        <input
          className="p-2 my-2 h-8 border rounded-md"
          type="text"
          placeholder="username"
          //   value="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 my-2 h-8 border rounded-md"
          type="password"
          placeholder="password"
          //   value="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          //   disabled="true"
          disabled={!username || !password}
          className="w-36 h-7 bg-teal-600 text-white border-none font-bold m-2  cursor-pointer rounded-md disabled:bg-teal-300 disabled:cursor-not-allowed"
          onClick={handleClick}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
      <span
        data-testid="error"
        style={{ visibility: error ? "visible" : "hidden" }}
        className="text-red-400 mt-5"
      >
        Something went wrong!
      </span>
    </div>
  );
}

export default Login;

```

In Login.test.js:

```
import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";

test("username input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button should be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled by default", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  expect(userInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("button should not be disabled when username and password entered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(buttonEl).not.toBeDisabled();
});

test("loading should be rendered when button when username and password entered and button is clicked", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  expect(buttonEl).toHaveTextContent(/please wait/i);
});

```
Your tests should not depened on the browser or back end server. Create an axios mock so we don't need anything from the browser or back-end server like axios calls while testing. 

In src create __mocks__/axios.js

In Login.test.js:
```
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  // Since we are using ES6 and above we have to write the line below or it won't work:
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "James" },
    }),
  },
}));

....

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  const userItem = await screen.findByText("James"); //getByText query is not async
  expect(userItem).toBeInTheDocument();
});

```

In Login.jsx:
```
import axios from "axios";
import React, { useState } from "react";

function Login() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      setUser(data); // test user should be rendered after fetching by commenting this
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };
  return (
    <div className="flex flex-col w-full h-[100vh] items-center justify-center">
      <form className="flex flex-col items-center">
        <span className="text-black font-bold">{user.name}</span>
        <input
          className="p-2 my-2 h-8 border rounded-md"
          type="text"
          placeholder="username"
          //   value="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="p-2 my-2 h-8 border rounded-md"
          type="password"
          placeholder="password"
          //   value="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          //   disabled="true"
          disabled={!username || !password}
          className="w-36 h-7 bg-teal-600 text-white border-none font-bold m-2  cursor-pointer rounded-md disabled:bg-teal-300 disabled:cursor-not-allowed"
          onClick={handleClick}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
      <span
        data-testid="error"
        style={{ visibility: error ? "visible" : "hidden" }}
        className="text-red-400 mt-5"
      >
        Something went wrong!
      </span>
    </div>
  );
}

export default Login;

```