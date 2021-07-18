import { createStore, applyMiddleware} from 'redux';
import * as redux from 'react-redux';
import { Provider } from 'react-redux';
import {FullArticle} from '../FullArticle';
import {fireEvent, render, waitFor} from '@testing-library/react';
import React from 'react';
import "@testing-library/jest-dom/extend-expect";
import validArticle from '../__mocks__/validArticle.json';
import TestRenderer from "react-test-renderer";

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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(validArticle),
  })
);

beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
        value: fakeLocalStorage,
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

const store = createStore(() => [], {}, applyMiddleware());

test("Article renders with valid json", async () => {

    const {getAllByText} = render(<Provider store={store}><FullArticle/></Provider>);

    await waitFor(() => {
        expect(getAllByText('est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla'));
    })
});

test("Component renders with api failure", async () => {

    fetch.mockImplementationOnce(() => Promise.reject("API FAILURE"));
    
      const {getByTestId} = render(<Provider store={store}><FullArticle/></Provider>);
    
      await waitFor(() => {
        expect(getByTestId("articleContainer")).toBeTruthy();
      })
    });

test("Favorite button is visible if article is not set to favorite", async () => {

    const {getByTestId} = render(<Provider store={store}><FullArticle/></Provider>);

    await waitFor(() => {
        expect(getByTestId("favoriteButton")).toBeTruthy();
    })
});

test("Favorite button isnt visible after adding to favorites and article is saved in localstorage", async () => {

    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue(2);

    const {queryByTestId} = render(<Provider store={store}><FullArticle/></Provider>);

    await waitFor(() => {
        fireEvent.click(queryByTestId("favoriteButton"));
    })

    await waitFor(() => {
        expect(queryByTestId("favoriteButton")).toBeNull();
        expect(window.localStorage.getItem('favorites')).toEqual('2');
    })
});

test("matches snapshot", () => {
    const tree = TestRenderer.create(<Provider store={store}><FullArticle/></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
  });