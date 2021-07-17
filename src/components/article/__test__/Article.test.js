import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import {Article} from '../Article';
import {fireEvent, render, waitFor} from '@testing-library/react';
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import TestRenderer from "react-test-renderer";

const store = createStore(() => [], {}, applyMiddleware());

const fakeLocalStorage = (() => {
    let store = {};
  
    return {
      getItem: (key) => {
        return store[key] || null;
      },
      setItem: (key, value) => {
        store[key] = value.toString();
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
  })();

beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
        value: fakeLocalStorage,
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

const id = 1;
const title = "sunt aut facere repellat provident occaecati excepturi optio reprehenderit";
const paragraph = "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto";

test("Article renders with valid props passed", async () => {

    const {getAllByText} = render(<Provider store={store}><Article id={id} title={title} paragraph={paragraph}/></Provider>);

    await waitFor(() => {
        expect(getAllByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit'));
        expect(getAllByText('quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto'));
    })
});

test("Container renders without props", async () => {

    const {getByTestId} = render(<Provider store={store}><Article id={undefined} title={undefined} paragraph={undefined}/></Provider>);

    await waitFor(() => {
        expect(getByTestId("articleContainer")).toBeTruthy();
    })
});

test("Favorite button recives class after click and article is added to local storage", async () => {

    const {getByTestId} = render(<Provider store={store}><Article id={id} title={title} paragraph={paragraph}/></Provider>);

    await waitFor(() => {
        fireEvent.click(getByTestId("addToFavorite"));
    });

    await waitFor(() => {
        expect(getByTestId("addToFavorite")).toHaveClass(`articleContainer__favourite--active`);
        expect(window.localStorage.getItem('favorites')).toEqual('1');
    })
});

test("Articles is removed from localstorage", async () => {

    const {getByTestId} = render(<Provider store={store}><Article id={id} title={title} paragraph={paragraph}/></Provider>);

    await waitFor(() => {
        fireEvent.click(getByTestId("favorite"));
    });

    await waitFor(() => {
        expect(window.localStorage.getItem('favorites')).toEqual(null);
    })
});

test("matches snapshot", () => {
    const tree = TestRenderer.create(<Provider store={store}><Article id={id} title={title} paragraph={paragraph}/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });